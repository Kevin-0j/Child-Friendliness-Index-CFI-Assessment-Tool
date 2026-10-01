import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'buildings.json');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  try {
    if (!fs.existsSync(dbPath)) {
      return NextResponse.json([], { headers: corsHeaders });
    }
    const data = fs.readFileSync(dbPath, 'utf8');
    return NextResponse.json(JSON.parse(data), { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read database' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request: Request) {
  try {
    const newBuilding = await request.json();
    let buildings = [];
    if (fs.existsSync(dbPath)) {
      buildings = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    }
    
    // Check if updating
    if (newBuilding.id) {
      const index = buildings.findIndex((b: any) => b.id === newBuilding.id);
      if (index >= 0) {
        buildings[index] = { ...buildings[index], ...newBuilding, updatedAt: new Date().toISOString() };
      } else {
        buildings.unshift({ ...newBuilding, createdAt: new Date().toISOString() });
      }
    } else {
      newBuilding.id = Date.now().toString();
      buildings.unshift({ ...newBuilding, createdAt: new Date().toISOString() });
    }

    fs.writeFileSync(dbPath, JSON.stringify(buildings, null, 2));
    return NextResponse.json(newBuilding, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to write to database' }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400, headers: corsHeaders });

    if (fs.existsSync(dbPath)) {
      let buildings = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      buildings = buildings.filter((b: any) => b.id !== id);
      fs.writeFileSync(dbPath, JSON.stringify(buildings, null, 2));
      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }
    return NextResponse.json({ error: 'Database not found' }, { status: 404, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500, headers: corsHeaders });
  }
}
