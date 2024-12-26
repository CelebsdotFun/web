#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod CelebsDotFun {
    use super::*;

    pub fn mint_celebrity_coin(
        ctx: Context<MintCelebrityCoin>,
        name: String,
        is_alive: bool,
        ai_sentiment_score: u8,
        initial_supply: u64
    ) -> Result<()> {
        let celebrity = &mut ctx.accounts.celebrity;
        celebrity.name = name;
        celebrity.is_alive = is_alive;
        celebrity.ai_sentiment_score = ai_sentiment_score;
        celebrity.supply = initial_supply;
        celebrity.meme_power = calculate_meme_power(ai_sentiment_score, initial_supply);
        Ok(())
    }

    pub fn update_ai_sentiment(
        ctx: Context<UpdateSentiment>,
        new_score: u8
    ) -> Result<()> {
        let celebrity = &mut ctx.accounts.celebrity;
        celebrity.ai_sentiment_score = new_score;
        celebrity.meme_power = calculate_meme_power(new_score, celebrity.supply);
        Ok(())
    }
}

fn calculate_meme_power(sentiment: u8, supply: u64) -> u64 {
    (sentiment as u64) * supply / 100
}

#[derive(Accounts)]
pub struct MintCelebrityCoin<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    
    #[account(
        init,
        payer = payer,
        space = Celebrity::SPACE
    )]
    pub celebrity: Account<'info, Celebrity>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateSentiment<'info> {
    #[account(mut)]
    pub celebrity: Account<'info, Celebrity>,
}

#[account]
#[derive(InitSpace)]
pub struct Celebrity {
    pub name: String,
    pub is_alive: bool,
    pub ai_sentiment_score: u8,
    pub supply: u64,
    pub meme_power: u64,
}
