import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    const data = await fetch(`https://api.mojang.com/users/profiles/minecraft/${username}`)
        .then(res => res.json())
        .catch(err => console.log(err));

    // Create a new basket
    const basketResponse = await fetch(`https://headless.tebex.io/api/accounts/${process.env.NEXT_PUBLIC_TEBEX_TOKEN}/baskets`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ip_address: req.ip,
            username: data.name,
        }),
    })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
            return NextResponse.json({
                userData: data,
                basketData: null
            }, { error: err, status: 400 });
        });

    if (basketResponse.status === 400) {
        console.log(basketResponse);
        return NextResponse.json({ error: basketResponse.title }, { status: 400 });
    }

    return NextResponse.json({
        userData: data,
        basketData: basketResponse
    });
}