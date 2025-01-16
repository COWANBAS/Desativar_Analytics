GREASYFORK: https://greasyfork.org/en/scripts/523946-remover-googlehistory

O script tem como objetivo melhorar a privacidade do usuário ao evitar rastreamentos e redirecionamentos no Google, tornando a navegação mais direta e sem a coleta de dados indesejada.

*Função Anônima para Desativar o GoogleAnalytics*

UnsafeWindow: Permite acessar o escopo global da página carregada. Isso é necessário, pois o script está sendo executado em um ambiente de UserScript e não diretamente no contexto da página.
A função redefine o valor de unsafeWindow._gaUserPrefs.ioo para uma função que sempre retorna true. Essa função é interna do GoogleAnalytics e, ao ser sobrescrita dessa forma, impede que o Google Analytics ative o rastreamento de preferências do usuário.

![image](https://github.com/user-attachments/assets/14f5c06b-41cc-4a9a-93ee-c24f03be6a4b)

*Impedir a Modificação da Função RWT*

Object.defineProperty: Define a propriedade rwt no unsafeWindow (escopo global da página) e especifica:
value: Define a função rwt como uma função vazia. Isso efetivamente a "desativa", ou seja, quando chamada, ela não faz nada.
writable: false: Impede que a função rwt seja sobrescrita ou modificada depois de definida. Isso é feito para garantir que, se o Google tentar alterar a função novamente, a alteração não terá efeito.

![image](https://github.com/user-attachments/assets/5ef9c7ea-6ccb-4fb9-b86b-e0e3a042bce0)

*Modificação dos Links de Pesquisa com a Classe*

Verifica se existe um elemento na página com a classe .cleanslate. Este é um seletor que pode ser usado para indicar que a página de resultados do Google está carregada com links que precisam ser modificados.
document.querySelectorAll('a[href^="/url"]'): Seleciona todos os links (<a>) cuja URL começa com /url. Esses links são usados pelo Google para rastrear cliques, redirecionando o usuário para o link real.
Dentro do loop for, a função pega o atributo href do link e cria um objeto URL a partir dele.
url.searchParams.get('q'): Obtém o valor do parâmetro q da URL, que é o URL real de destino (onde o link deveria apontar).
O href do link é então modificado para apontar diretamente para o URL real, removendo o redirecionamento.

![image](https://github.com/user-attachments/assets/936bac3c-8459-47a1-a2a6-5e7df4d0a5bc)

*Modificação dos Links de Pesquisa com o ID*

Verifica se existe um elemento na página com o ID #desktop-search. Isso indica que estamos visualizando uma página de resultados de pesquisa do Google em formato de desktop.
document.querySelectorAll('.r a'): Seleciona todos os links dentro de elementos com a classe .r (que são os links de resultados de pesquisa do Google).
Como no caso anterior, dentro do loop for, o script pega o valor do parâmetro q da URL dos links e redefine o href para apontar diretamente para a URL real, removendo o redirecionamento do Google.

![image](https://github.com/user-attachments/assets/82b92ba3-c73e-458d-b0ff-34a3857fcd07)
