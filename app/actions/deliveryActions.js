//definindo os nomes das ACTIONS..
export const ADICIONAR_ITEM = "adicionar_item";
export const REMOVER_ITEM = "remover_item";

//criando a função para executar a ACTION
export const adicionarItem = (dados) => (
    //montando a ação..
    {
        type : ADICIONAR_ITEM, //nome da ACTION
        data : dados //conteúdo da ACTION
    }   
)

//criando a função para executar a ACTION
export const removerItem = (dados) => (
    //montando a ação..
    {
        type : REMOVER_ITEM, //nome da ACTION
        data : dados //conteúdo da ACTION
    }   
)

