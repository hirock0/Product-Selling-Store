import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { VerifUser } from './app/actions/verifyToken'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token: any = request.cookies.get("token")?.value
  const pathname = request.nextUrl.pathname
  const isPublicPath = pathname === "/user/login" || pathname === "/user/register"
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (token && !isPublicPath) {
    const validation = await VerifUser(token)
    if (validation?.varified) {
      return NextResponse.next();
    }
  }
  if (!token && !isPublicPath) {
    const loginUrl = new URL("/user/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(new URL(loginUrl))
  }

}


export const config = {
  matcher: ['/pages/api/products/carts/:path*', "/user/login", "/user/register"],
}