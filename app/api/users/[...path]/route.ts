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
    const cookieHeader = request.headers.get('cookie');
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { 'Cookie': cookieHeader }),
      },
      credentials: 'include',
    });

    const contentType = response.headers.get('Content-Type') || 'application/json';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();
    
    if (!response.ok) {
      return NextResponse.json(
        { message: (typeof data === 'string' ? data : data?.message) || `Server error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType);
    
    const setCookieHeaders = response.headers.getSetCookie();
    setCookieHeaders.forEach(cookie => {
      let modifiedCookie = cookie.replace(/;\s*domain=[^;]+/gi, '');
      if (!modifiedCookie.includes('path=')) {
        modifiedCookie += '; path=/';
      }
      responseHeaders.append('set-cookie', modifiedCookie);
    });
    
    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Proxy error' },
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
    const cookieHeader = request.headers.get('cookie');
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { 'Cookie': cookieHeader }),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('Content-Type') || 'application/json';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();
    
    if (!response.ok) {
      return NextResponse.json(
        { message: (typeof data === 'string' ? data : data?.message) || `Server error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType);
    
    const setCookieHeaders = response.headers.getSetCookie();
    setCookieHeaders.forEach(cookie => {
      let modifiedCookie = cookie.replace(/;\s*domain=[^;]+/gi, '');
      if (!modifiedCookie.includes('path=')) {
        modifiedCookie += '; path=/';
      }
      responseHeaders.append('set-cookie', modifiedCookie);
    });
    
    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Proxy error' },
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
    const cookieHeader = request.headers.get('cookie');
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { 'Cookie': cookieHeader }),
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const contentType = response.headers.get('Content-Type') || 'application/json';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();
    
    if (!response.ok) {
      return NextResponse.json(
        { message: (typeof data === 'string' ? data : data?.message) || `Server error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType);
    
    const setCookieHeaders = response.headers.getSetCookie();
    setCookieHeaders.forEach(cookie => {
      let modifiedCookie = cookie.replace(/;\s*domain=[^;]+/gi, '');
      if (!modifiedCookie.includes('path=')) {
        modifiedCookie += '; path=/';
      }
      responseHeaders.append('set-cookie', modifiedCookie);
    });
    
    return NextResponse.json(data, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Proxy error' },
      { status: 500 }
    );
  }
}
