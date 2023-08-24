import { auth } from '@clerk/nextjs';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse, NextRequest } from 'next/server';
import { Schema, ZodError } from 'zod';

type CallBackFunct = ({
    req,
    userId,
    params,
    body,
}: {
    req: NextRequest;
    params?: any;
    body?: any;
    userId: string;
}) => void;

export function authHandler(cb: CallBackFunct, schema?: Schema) {
    return async (req: NextRequest, { params }: Params) => {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        switch (req.method) {
            case 'GET':
            case 'DELETE':
                return cb({ req, params, userId });
            case 'POST':
            case 'PATCH':
                try {
                    console.log('post request');
                    const body = await req.json();
                    if (body.userId) {
                        const parsedBody = schema?.parse({ ...body, userId });
                        return cb({ req, userId, body: parsedBody });
                    }
                    console.log('patch request');
                    const parsedBody = schema?.parse(body);
                    return cb({ req, userId, params, body: parsedBody });
                } catch (err) {
                    if (err instanceof ZodError) {
                        console.log('invalid data:', err);
                        return NextResponse.json(
                            {
                                message: 'Invalid data.',
                            },
                            { status: 422 }
                        );
                    }
                    console.log('unexpected error in authHandler:', err);
                    return NextResponse.json(
                        { message: 'Something unexpected went wrong.' },
                        { status: 500 }
                    );
                }
            default:
                return NextResponse.error();
        }
    };
}
