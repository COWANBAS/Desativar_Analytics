O script tem como objetivo melhorar a privacidade do usuário ao evitar rastreamentos e redirecionamentos no Google, tornando a navegação mais direta e sem a coleta de dados indesejada.

*Função Anônima para Desativar o GoogleAnalytics*

UnsafeWindow: Permite acessar o escopo global da página carregada. Isso é necessário, pois o script está sendo executado em um ambiente de UserScript e não diretamente no contexto da página.
A função redefine o valor de unsafeWindow._gaUserPrefs.ioo para uma função que sempre retorna true. Essa função é interna do GoogleAnalytics e, ao ser sobrescrita dessa forma, impede que o Google Analytics ative o rastreamento de preferências do usuário.

![image](https://github.com/user-attachments/assets/14f5c06b-41cc-4a9a-93ee-c24f03be6a4b)

*Impedir a Modificação da Função RWT*

Object.defineProperty: Define a propriedade rwt no unsafeWindow (escopo global da página) e especifica:
value: Define a função rwt como uma função vazia. Isso efetivamente a "desativa", ou seja, quando chamada, ela não faz nada.
writable: false: Impede que a função rwt seja sobrescrita ou modificada depois de definida. Isso é feito para garantir que, se o Google tentar alterar a função novamente, a alteração não terá efeito.
