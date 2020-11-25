import { renderFileToString } from 'https://deno.land/x/dejs/mod.ts';
import { select } from '../models/pg_model.ts';
import TSql from '../models/sql.ts';

const home = async({response} : {response : any}) => {
    const dataTabel = await select(
        [
          {text : TSql['KtgFindAll']},  
          {text : TSql['BlogInfoFindAll']}
        ]
    );
    const html =  await renderFileToString("./views/home.ejs", {
        data : { 
            pemrograman : dataTabel[0],
            blogInfo : dataTabel[1]       
        },
        subview :{
            namafile : "./views/blog-main.ejs",
            showjumbotron : true
        }
    });
    response.body = new TextEncoder().encode(html);
}
const signup = async({response} : {response : any}) => {
    const html =  await renderFileToString("./views/home.ejs", {
        data : {
            pemrograman : await select({
                text : TSql['KtgFinInKode'],
                args : ['php', 'ts', 'js']
            }),
            blogInfo : await select ({
                text : TSql['BlogInfoFindAll']
            })
        },
        subview : {
            namafile : "./views/signup.ejs",
            showjumbotron : false
        }
    });
    response.body = new TextEncoder().encode(html);
}
const saveuser = async({request, response} : {request : any, response : any}) => {
    const result = await request.body().value;
    const parceData = new URLSearchParams(result);
    const namalengkap = parceData.get("fullname");
    const namauser = parceData.get("username");
    const pwd = parceData.get("paswd");

    response.body ="Data yang di POST : "+namalengkap+" , "+namauser+", "+pwd;
}
const kategori = async ({params, response} :{params : {id : string}, response:any}) => {
    response.body = "ID Parameter: "+ params.id;
}
export { home, signup, saveuser, kategori }