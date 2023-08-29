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
    userId?: string;
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
                return cb({ req, userId });
            case 'DELETE':
                return cb({ req, params });
            case 'POST':
                try {
                    const body = await req.json();
                    const parsedPostData = schema?.parse({
                        ...body,
                        userId,
                    });
                    return cb({ req, body: parsedPostData, userId });
                } catch (err) {
                    if (err instanceof ZodError) {
                        console.log('invalid post data:', err);
                        return NextResponse.json(
                            {
                                message: 'Invalid data.',
                            },
                            { status: 422 }
                        );
                    }
                    return NextResponse.json(
                        { message: 'Something unexpected went wrong.' },
                        { status: 500 }
                    );
                }
            case 'PATCH':
                try {
                    const parsedPatchData = schema?.parse(await req.json());
                    return cb({ req, params, body: parsedPatchData });
                } catch (err) {
                    if (err instanceof ZodError) {
                        console.log('invalid data:', err);
                        return NextResponse.json(
                            {
                                message: 'Invalid patch data.',
                            },
                            { status: 422 }
                        );
                    }
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
