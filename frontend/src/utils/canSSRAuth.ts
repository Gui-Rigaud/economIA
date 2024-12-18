import { AuthTokenError } from '@/errors/AuthTokenError';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies'

//Só users podem acessar essa página
export function canSSRAuth<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);

        const token = cookies['@nextauth.token'];

        // Se o cara tentar acessar a pagina porem tendo já um login salvo redirecionamos
        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
        }

        try {
            return await fn(ctx);
        }catch(err){
            if(err instanceof AuthTokenError){
                destroyCookie(ctx, '@nextauth.token');

                return {
                    redirect: {
                        destination: '/', 
                        permanent: false
                    }
                }
            }
        }
        
        return await fn(ctx);
    }

}