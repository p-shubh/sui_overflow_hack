module addrx::voyager {
    use std::string::{Self, String};
    use sui::object::{Self, ID, UID};
    use sui::event;
    // use std::vector;
    use sui::table::{Table, Self};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::balance::{Self,Balance};
    use sui::sui::SUI;
    use sui::url::{Self, Url};
    use sui::clock::{Self, Clock};

     // Constants
    const MEMBER: vector<u8> = b"Member";
    const LENDING_CAP: u64 = 30;
    const MIN_HEALTH_FACTOR: u64 = 10;

    // Error codes
    /// Insufficient funds
    const EInsufficientFunds: u64 = 1;       
    const EUserCannotUnStake: u64 = 2;
    const ENotCultAdmin: u64 = 3;
    const EUserAlreadyExists: u64 = 4;
    const ENotEligible: u64 = 5;
    const ELoanExpired: u64 = 6;
 
    struct State has key {
        id:  UID,
        admin: address,
        reputation_board: Table<u8,Role>,
        user_board: Table<address,Member_Info>,
        tvl: Balance<SUI>,
        actual_tvl_amount: u64,
        interest_rate: u64,
        nft_price: u64,
        members: u64,
        min_membership_time: u64,
        /// @doc should be in months
        max_borrow_time: u64, 
    }

    struct Vault has key,store {
        id: UID,
        borrower_address: address,
        locked_nft: Cult_NFT,
        // user_details: Table<address,Loan_Info>
        user_details: Loan_Info,
    }

    struct Cult_NFT has key, store {
        id: UID,
        /// Token Name
        name: String,
        /// Token Description
        description: String,
        /// Token URI
        url: Url,
    }

    struct Role has store,drop {
        role: String,
        reputation_score: u8,
        borrow_eligibility: bool,
    }

    struct Member_Info has store,drop{
        //Role Id
        role_id: u8,
        // Time Of taking the membership
        registration_time: u64,
    }

    struct Loan_Info has store,drop,copy {
        //borrowed money amount
        loan_amount: u64,
        //loan duration amount 
        loan_expiration_date: u64,
        //Loan ID  
        // loan_id : u64,
        current_tvl_amount: u64,
    }

    // Event Structs 
    struct NFTMinted has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: String,
        //url 
        url: Url
    }

    struct NFTUnstaked has copy, drop {
        // object_id: ID,
        creator: address,
    }

    // struct RoleUpdated has copy, drop {
    //     role_id: u8,
    //     new_score: u8,
    //     new_eligibility: bool,
    // }

    struct UserEndorsed has copy, drop {
        user: address,
        role_id: u8,
    }

    struct RoleAdded has copy, drop {
        role_id: u8,
        new_role_name: String,
        new_score: u8,
        new_eligibility: bool,
    }

    // struct UserRoleUpdated has copy, drop {
    //     user: address,
    //     old_role_id: u8,
    //     new_role_id: u8,
    // }

    // struct VaultCreated has copy, drop {
    //     vault_id: ID,
    //     borrower: address,
    //     nft_id: ID,
    //     loan_amount: u64,
    //     expiration_date: u64,
    // }



    entry fun intialize_cult(
        score: u8,
        interest: u64,
        price: u64,
        min_time: u64,
        borrow_time: u64,
        ctx: &mut TxContext
    ){
        let member = string::utf8(MEMBER);
        let role = Role {
            role: member,
            reputation_score: score,
            borrow_eligibility: false,
        };

        let table_obj = table::new<u8,Role>(ctx);
        table::add(&mut table_obj,1,role);

        let user_obj = table::new<address,Member_Info>(ctx);       



        transfer::share_object(State{
            id: object::new(ctx),
            admin:  tx_context::sender(ctx),
            reputation_board: table_obj,
            user_board: user_obj,
            tvl: balance::zero(),
            actual_tvl_amount: 0,
            interest_rate: interest,
            nft_price: price,
            members: 0,
            min_membership_time: min_time,
            max_borrow_time: borrow_time
        });

    }

    public entry fun membership_and_stake(
        amount: Coin<SUI>, 
        state: &mut State, 
        nft_name: String,
        nft_description: String, 
        uri: String,
        clock: &Clock,
        ctx: &mut TxContext
    ){
        let sender = tx_context::sender(ctx);
        assert!(table::contains(&state.user_board,sender),EUserAlreadyExists);
        assert!(coin::value(&amount) == state.nft_price,EInsufficientFunds);
 
        let coin_balance = coin::into_balance(amount);
        balance::join(&mut state.tvl,coin_balance);

        let actual_tvl = state.actual_tvl_amount;
        state.actual_tvl_amount =  actual_tvl + state.nft_price;
        
        let member_info = Member_Info{
            role_id: 1,
            registration_time:  clock::timestamp_ms(clock),
        };

        table::add(&mut state.user_board,sender,member_info);

        let nft = Cult_NFT{
            id: object::new(ctx),
            name: nft_name,
            description: nft_description,
            url: url::new_unsafe_from_bytes(*string::bytes(&uri)),
        };

        event::emit(NFTMinted {
            object_id: object::id(&nft),
            creator: sender,
            name: nft.name,
            url: nft.url,
           
        });

        transfer::transfer(nft,sender);
    }

    entry fun unstake_membership(state: &mut State, nft: Cult_NFT,clock: &Clock ,ctx: &mut TxContext){
        let sender = tx_context::sender(ctx);   
        let time = clock::timestamp_ms(clock);
        let user_joining_obj = table::borrow(&state.user_board,sender);
        let user_joining_time = user_joining_obj.registration_time;

        let time_period = time - user_joining_time;
        assert!(time_period >= state.min_membership_time,EUserCannotUnStake);

        table::remove(&mut state.user_board,sender);

        let unstake_value = coin::take(&mut state.tvl, state.nft_price,ctx);
        // Decrease the actual value of tvl 
        let actual_tvl = state.actual_tvl_amount;
        state.actual_tvl_amount =  actual_tvl - state.nft_price;
        
        transfer::public_transfer(unstake_value,tx_context::sender(ctx));
        let Cult_NFT { 
            id, 
            name: _, 
            description: _, 
            url: _,
        } = nft;
        
        event::emit(NFTUnstaked {
            creator: sender,
        });

        object::delete(id);
    }


    entry fun endorsement(state: &mut State, user: address, role: u8,ctx: &TxContext){
        assert_is_cult_admin(state,tx_context::sender(ctx));
        let user_role = table::borrow_mut(&mut state.user_board,user);
        user_role.role_id = role; 

        event::emit(UserEndorsed{
            user,
            role_id: role,
        });
    }

    entry fun add_new_role(
        state: &mut State,
        role_name: String, 
        repu_score: u8, 
        eligibility: bool,
        ctx: &TxContext
    ){
        assert_is_cult_admin(state,tx_context::sender(ctx));
        let counter = table::length(&state.reputation_board);

        let role = Role {
            role: role_name,
            reputation_score: repu_score,
            borrow_eligibility: eligibility,
        };

        let counter1 = (counter as u8) + 1;
        table::add(&mut state.reputation_board,counter1,role);

        event::emit(RoleAdded{
            role_id: counter1,
            new_role_name: role_name,
            new_score: repu_score,
            new_eligibility: eligibility,
        });

    }
    entry fun  update_role_score(state: &mut State,role_Id: u8,role_score: u8, ctx: &TxContext){
        assert_is_cult_admin(state,tx_context::sender(ctx));
        let repu_board_obj = table::borrow_mut(&mut state.reputation_board,role_Id);
        repu_board_obj.reputation_score = role_score;
    }
    entry fun update_role_eligibility(state: &mut State,role_Id: u8,role_eligibility: bool, ctx: &TxContext){
         assert_is_cult_admin(state,tx_context::sender(ctx));
        let repu_board_obj = table::borrow_mut(&mut state.reputation_board,role_Id);
        repu_board_obj.borrow_eligibility = role_eligibility;
    }

    entry fun lending_vault(
        amount_required: u64,
        loan_duration: u64,
        state: &mut State,
        // vault: &mut Vault, 
        nft: Cult_NFT, 
        clock: &Clock,
        ctx: &mut TxContext
    ){  
        let sender = tx_context::sender(ctx);
        assert_is_lending_possible(amount_required,loan_duration,state,ctx);
        // let length = vector::length(&vault.locked_nft);
        // vector::push_back(&mut vault.locked_nft,nft);
        let expiration_date = clock::timestamp_ms(clock) + loan_duration;
        let loan_info = Loan_Info {
            loan_amount: amount_required,
            loan_expiration_date: expiration_date,
            // loan_id: length,
            current_tvl_amount: state.actual_tvl_amount,
        };
        // let table1 = table::new<address,Loan_Info>(ctx);
        let vault = Vault {
            id: object::new(ctx),
            borrower_address: sender,
            locked_nft: nft,
            user_details: loan_info
        };
        transfer::share_object(vault);
        let loan_value = coin::take(&mut state.tvl,amount_required,ctx);
        transfer::public_transfer(loan_value,sender);
    }

    // entry fun repay(amount: Coin<SUI>,vault: Vault,state:&mut State,clock: &Clock,ctx: &TxContext){
    //     let loan_time_obj: vault.user_details;
    //     let loan_time: loan_time_obj.loan_expiration_date;
    //     let time = clock::timestamp_ms(clock);
    //     assert!(loan_time < time,ELoanExpired);

    //     let coin_balance = coin::into_balance(amount);
    //     balance::join(&mut state.tvl,coin_balance);
        
    // } 

    // entry fun liquidate(user: address,state: &mut State,vault: Vault,clock: &Clock,ctx: &mut TxContext){
    //     assert_is_cult_admin(state,tx_context::sender(ctx));
    //     let loan = vault.user_details;
    //     let health_factor_info = health_factor(user,state,&vault);
    //     let time = clock::timestamp_ms(clock);
    //     if(health_factor_info < MIN_HEALTH_FACTOR  || loan.loan_expiration_date < time){
    //         let Vault{
    //             id,
    //             borrower_address:_,
    //             locked_nft,
    //             user_details:_,
    //         } = vault;
    //         transfer::transfer(locked_nft,tx_context::sender(ctx));
    //         object::delete(id);
    //     }
    // }

    // entry fun 


//    public entry fun health_factor(user: address, state: &State,vault: &Vault): u64 {
//         let loan_time_tvl_amount_obj = vault.user_details;
//         let loan_time_tvl_amount = loan_time_tvl_amount_obj.current_tvl_amount;        
       
//         let tvl_amount = balance::value(&state.tvl);

//         if( tvl_amount - loan_time_tvl_amount > 0){
//             let diff_percentage = (tvl_amount - loan_time_tvl_amount) * 100/ tvl_amount;
//             return diff_percentage
//         }
//         else{
//             return 0
//         }       
//     }

    fun assert_is_lending_possible(  
        amount_required: u64,
        loan_duration: u64,
        state: &State,
        ctx: &TxContext 
    ){
        let sender = tx_context::sender(ctx);
        // Condition1: If loan duration is valid
        assert!(loan_duration <= state.max_borrow_time,ENotEligible);
        //Condition2: If role which the nft holder is eligible        
        let role_obj = table::borrow(&state.user_board,sender);
        let role_info = role_obj.role_id;
        let eligibility_obj = table::borrow(&state.reputation_board,role_info);
        let eligibility = eligibility_obj.borrow_eligibility;

        assert!(eligibility,ENotEligible);
        // Condition3: Difference percentage should not have crossed Lending cap percentage   
        let tvl_amount = balance::value(&state.tvl);
        let actual_tvl_amount_info = state.actual_tvl_amount;

        let diff_percentage = (actual_tvl_amount_info - tvl_amount) * 100 / actual_tvl_amount_info ;
        //Condition4: Will amount required will be greater than the Lending Cap
        assert!(diff_percentage <= LENDING_CAP,ENotEligible);
        //Conditon if the Updated Amount will cross lending Cap
        let amout_updated_after_loan_percentage =  (actual_tvl_amount_info - tvl_amount - amount_required) * 100 / actual_tvl_amount_info ;
        assert!(amout_updated_after_loan_percentage <= LENDING_CAP,ENotEligible);
    }  


    fun assert_is_cult_admin(state: &State, user: address){
        assert!(state.admin == user,ENotCultAdmin);
    }


}

