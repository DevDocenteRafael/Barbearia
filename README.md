# Dev Barber

Página institucional de uma barbearia, criada como projeto acadêmico para a Semana de Ciência e Tecnologia. O site apresenta os serviços, horário de funcionamento, localização e opções de contato para agendamento.

## Acessibilidade

- Alternância entre modo escuro e modo claro, com preferência salva no navegador.
- Link para pular diretamente ao conteúdo principal.
- Controles de tema identificados para leitores de tela e estados anunciados via `aria-pressed`.
- Suporte à preferência do sistema por movimento reduzido nas animações.
- Layout adaptável para telas menores e foco de teclado visível.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Font Awesome e AOS (bibliotecas carregadas por CDN)

## Como executar

1. Baixe ou clone este repositório.
2. Abra `index.html` em um navegador. Para uma experiência mais consistente, use uma extensão de servidor local, como Live Server no Visual Studio Code.

Não é necessário instalar dependências ou compilar o projeto.

## Estrutura

```text
├── assets/       # Imagens, logotipo e ícones
├── partials/     # Arquivos SCSS de apoio
├── index.html    # Estrutura da página
├── style.css     # Estilos e temas
└── script.js     # Alternância de tema e animações
```

## Personalização

- Edite textos, preços, links de contato e endereço no `index.html`.
- Ajuste cores e estilos no `style.css`.
- Substitua as imagens dentro de `assets/` mantendo os caminhos correspondentes no HTML.

## Demonstração

[Ver versão publicada no GitHub Pages](https://devdocenterafael.github.io/Barbearia/)

## Créditos

Projeto desenvolvido para fins educacionais na Semana de Ciência e Tecnologia.
