import { NextRequest, NextResponse } from 'next/server';

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = `${HTTP_SERVER}/api/users/${path}${request.nextUrl.search}`;
    const body = await request.json();
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data || `Server error: ${response.status}` },
        { status: response.status }
      );
    }
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Proxy error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join('/');
    const url = `${HTTP_SERVER}/api/users/${path}${request.nextUrl.search}`;
    const body = await request.json();
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data || `Server error: ${response.status}` },
        { status: response.status }
      );
    }
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Proxy error' },
      { status: 500 }
    );
  }
}
