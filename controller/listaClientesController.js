import { clienteService } from "../service/cliente-service.js";

const criaNovaLina = (nome, email, id) =>{
    const linha = document.createElement('tr');
    const conteudo = `<td class="td" data-td>${nome}</td>
                        <td>${email}</td>
                        <td>
                            <ul class="tabela__botoes-controle">
                                <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
                                <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
                            </ul>
                        </td>`;


    linha.innerHTML = conteudo; 
    linha.dataset.id = id;
    return linha;
}

const tabela = document.querySelector('[data-tabela]');
tabela.addEventListener('click', async (evento) =>{
    let botaoDeletar = evento.target.className == 'botao-simples botao-simples--excluir';

    if (botaoDeletar) {
        try{
            const linhaCliente = evento.target.closest('[data-id]');
            let id = linhaCliente.dataset.id;
            
            await clienteService.removeCliente(id);
            linhaCliente.remove();
        }
        catch(erro){
            console.log(erro);
            window.location.href = '../telas/erro.html';
        }
        
    }
})

const render = async () =>{
    try{
        const cliente = await clienteService.listaClientes()
        cliente.forEach(elemento => {
        tabela.appendChild(criaNovaLina(elemento.nome,elemento.email, elemento.id));
        })
    }
    catch(erro){
        console.log(erro);
        window.location.href = '../telas/erro.html';
    }
}
render();
