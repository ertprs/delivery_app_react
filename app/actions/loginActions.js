//definindo os nomes das ACTIONS
export const AUTENTICAR_CLIENTE = "autenticar_cliente";

//função para executar a ação..
export const autenticarCliente = (dados) => (
    //montando a ação
    {
        type : AUTENTICAR_CLIENTE, //nome da ação
        data : dados //dados da ação
    }
)