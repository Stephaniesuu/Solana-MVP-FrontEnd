use anchor_lang::prelude::*;

declare_id!("BS1cp5pqzCS6s3XNYHGZfRUbowSKFr3R2jVCWa3dbZkE");

#[program]
pub mod web3_mvp {
    use super::*;

    pub fn greet(_ctx: Context<Initialize>) -> Result<()> {
        msg!("GM!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
