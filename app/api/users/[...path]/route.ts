import { NextRequest, NextResponse } from 'next/server';

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || 'http://localhost:4000';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    const url = `${HTTP_SERVER}/api/users/${path}${request.nextUrl.search}`;
    
    const cookieHeader = request.headers.get('cookie') || '';
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      credentials: 'include',
    });

    const data = await response.text();
    
    const responseHeaders = new Headers();
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      responseHeaders.set('set-cookie', setCookieHeader);
    }
    responseHeaders.set('Content-Type', response.headers.get('Content-Type') || 'application/json');
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data || `Server error: ${response.status}` },
        { status: response.status, headers: responseHeaders }
      );
    }
    
    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Proxy error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    const url = `${HTTP_SERVER}/api/users/${path}${request.nextUrl.search}`;
    const body = await request.json();
    
    const cookieHeader = request.headers.get('cookie') || '';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.text();
    
    const responseHeaders = new Headers();
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      responseHeaders.set('set-cookie', setCookieHeader);
    }
    responseHeaders.set('Content-Type', response.headers.get('Content-Type') || 'application/json');
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data || `Server error: ${response.status}` },
        { status: response.status, headers: responseHeaders }
      );
    }
    
    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Proxy error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    const url = `${HTTP_SERVER}/api/users/${path}${request.nextUrl.search}`;
    const body = await request.json();
    
    const cookieHeader = request.headers.get('cookie') || '';
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.text();
    
    const responseHeaders = new Headers();
    const setCookieHeader = response.headers.get('set-cookie');
    if (setCookieHeader) {
      responseHeaders.set('set-cookie', setCookieHeader);
    }
    responseHeaders.set('Content-Type', response.headers.get('Content-Type') || 'application/json');
    
    if (!response.ok) {
      return NextResponse.json(
        { message: data || `Server error: ${response.status}` },
        { status: response.status, headers: responseHeaders }
      );
    }
    
    return new NextResponse(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Proxy error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
