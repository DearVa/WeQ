export class ConsoleCatcher{
    private constructor() { console.info("~~~ CONSOLE CATCHER CTORED ~~~") }
    private static _instance :ConsoleCatcher;
    public static Instance():ConsoleCatcher{ return this._instance??=new ConsoleCatcher(); }
    catch(content:string,handler:()=>void){
        let handleList = this._handlers.get(content);
        if(handleList == null){
            handleList = [];
        }
        handleList.push(handler);
    }
    private _handlers = new Map<string,(()=>void)[]>();
    trigger(content:string){
        this._handlers.get(content)?.forEach(handler=>handler());
    }
}