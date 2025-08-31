// app/api/predictions/route.ts
import { NextResponse } from 'next/server';
import { env } from '@/env.mjs';
import 'server-only'; // Ensures this file can't be bundled for the client

export async function GET(req: Request) {
  try {
    // You can safely access server-side variables here
    const sportsApiKey = env.SPORTS_DATA_API_KEY;
    const oddsApiKey = env.ODDS_API_KEY;
    
    // Example API call to external sports data service
    // const response = await fetch(`https://api.sportsdata.io/v3/nfl/scores/json/Games/2024?key=${sportsApiKey}`);
    
    // For now, return mock data with environment info
    return NextResponse.json({ 
      message: 'Predictions fetched successfully',
      environment: env.NEXT_PUBLIC_APP_ENV,
      hasApiKeys: {
        sports: !!sportsApiKey,
        odds: !!oddsApiKey
      }
    });
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch predictions' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Access database URL for storing predictions
    const dbUrl = env.DATABASE_URL;
    
    // TODO: Store prediction in database
    // const result = await db.predictions.create({ data: body });
    
    return NextResponse.json({ 
      message: 'Prediction submitted successfully',
      predictionId: Math.random().toString(36).substr(2, 9) // temporary mock ID
    });
  } catch (error) {
    console.error('Error creating prediction:', error);
    return NextResponse.json(
      { error: 'Failed to create prediction' },
      { status: 500 }
    );
  }
}
