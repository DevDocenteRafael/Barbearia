# Dev Barber

Página institucional de uma barbearia, criada como projeto acadêmico para a Semana de Ciência e Tecnologia. O site apresenta os serviços, horário de funcionamento, localização e opções de contato para agendamento.

## Acessibilidade

- Botão flutuante arrastável com controles de tema claro e escuro.
- Controles para diminuir, restaurar e aumentar o tamanho do texto.
- Preferências e posição do botão salvas no navegador.
- Atalho para pular ao conteúdo principal, navegação por teclado e foco visível.
- Suporte à preferência do sistema por movimento reduzido.

## Tecnologias

- HTML5, CSS3, SCSS e JavaScript.
- Font Awesome e AOS, carregados por CDN.

## Como executar

Abra `index.html` em um navegador. Para desenvolvimento, use um servidor local, como a extensão Live Server no Visual Studio Code. Não é necessário instalar dependências para visualizar o site.

## Organização dos arquivos

Os arquivos foram separados por responsabilidade para facilitar a manutenção e o aprendizado:

- `index.html` fica na raiz porque é a página de entrada que o navegador carrega primeiro.
- `README.md` fica na raiz para que as instruções do projeto sejam fáceis de encontrar.
- `assets/` reúne imagens, logotipos e ícones usados pela página.
- `styles/` reúne os arquivos de estilo. `style.css` é carregado pelo navegador; `style.scss` é o arquivo-fonte SCSS; `partials/` guarda trechos SCSS reutilizados; `accessibilidade.css` contém regras de acessibilidade; e `style.css.map` conecta o CSS gerado aos arquivos SCSS de origem nas ferramentas de desenvolvimento.
- `scripts/` contém `script.js`, responsável pela alternância de tema, ajuste do tamanho da fonte e movimentação do botão flutuante.

O HTML aponta para os estilos em `styles/` e para o JavaScript em `scripts/`. Os caminhos das imagens continuam apontando para `assets/`. Ao mover ou renomear arquivos, atualize também os caminhos correspondentes no HTML, CSS ou JavaScript.

```text
├── assets/                   # Imagens, logotipos e ícones
├── scripts/
│   └── script.js             # Tema, fonte e botão de acessibilidade
├── styles/
│   ├── partials/             # Partes SCSS reutilizadas
│   ├── accessibilidade.css   # Regras de acessibilidade
│   ├── style.css             # Estilos carregados pelo navegador
│   ├── style.css.map         # Mapeamento entre CSS e SCSS
│   └── style.scss            # Arquivo principal SCSS
├── index.html                # Página principal
└── README.md                 # Documentação do projeto
```

## Personalização

- Edite textos, preços, contato e mapa em `index.html`.
- Ajuste os estilos em `styles/style.scss` e nos arquivos de `styles/partials/`.
- O navegador usa `styles/style.css`. Depois de editar o SCSS, regenere o CSS para que as alterações apareçam no site.
- Substitua imagens dentro de `assets/` mantendo os nomes ou atualizando os caminhos correspondentes.

## Demonstração

[Ver versão publicada no GitHub Pages](https://devdocenterafael.github.io/Barbearia/)

## Créditos

Projeto desenvolvido para fins educacionais na Semana de Ciência e Tecnologia.