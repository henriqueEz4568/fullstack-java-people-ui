# people-ui

Interface web da [people-api](../fullstack-java-people-api): cadastro, listagem, busca por documento, consulta de nacionalidade e exclusão de pessoas.

## Stack

- React 19 + TypeScript + Vite
- [shadcn/ui](https://ui.shadcn.com) (Radix + Tailwind CSS v4)
- Axios com uma instância única em [`src/lib/api.ts`](src/lib/api.ts)
- TanStack Query para cache, loading e atualização da lista após cadastro/exclusão
- React Hook Form para formulários, com as mesmas regras de validação da API

## Rodando

Suba a API com CORS liberado para a origem do Vite:

```bash
CORS_ALLOWED_ORIGINS=http://localhost:5173 ./mvnw spring-boot:run
```

Depois, neste projeto:

```bash
npm install
npm run dev
```

A interface abre em `http://localhost:5173` (ou na porta definida em `PORT`).

### Variáveis de ambiente

Copie `.env.example` para `.env` para mudar a porta ou apontar para outra API.

| Variável       | Padrão                  | Uso |
|----------------|-------------------------|-----|
| `PORT`         | `5173`                  | Porta do `npm run dev` e do `npm run preview` |
| `VITE_API_URL` | `http://localhost:8080` | Endereço da people-api |

Ao trocar a porta, inclua a nova origem no `CORS_ALLOWED_ORIGINS` da API (ex.: `http://localhost:3000`).

## Funcionalidades

| Tela | Rota consumida |
|------|----------------|
| Lista de pessoas | `GET /list` |
| Nova pessoa | `POST /registrarName` |
| Buscar por documento | `GET /list/{document}` |
| Nacionalidade (ícone de globo) | `GET /findNacionalityByPerson/{document}` |
| Excluir (ícone de lixeira) | `DELETE /list/{id}` 🔒 |

Erros da API (Problem Details) são exibidos no próprio campo quando possível: validação (`400`) e documento duplicado (`409`) aparecem no formulário; `404` e `502` aparecem na tela correspondente.

## API key

A exclusão exige a API key no header `X-API-Key`. A chave pode ser informada de duas formas:

- pelo botão **API key** no cabeçalho, que mostra se há uma chave configurada e permite substituí-la ou removê-la;
- direto na confirmação de exclusão, que pede a chave quando nenhuma foi informada.

A chave fica no `sessionStorage`, ou seja, vale só para a aba atual e some ao fechá-la. Se a API responder `401`, a chave salva é descartada e a interface pede uma nova.

Em desenvolvimento, a chave padrão da API é `dev-api-key`.

## Estrutura

```
src/
├── app/providers.tsx         QueryClient, API key e toasts
├── components/               componentes compartilhados (cabeçalho, campo de texto, mensagens de estado)
│   └── ui/                   componentes gerados pelo shadcn/ui
├── features/
│   ├── api-key/              contexto, armazenamento e formulário da API key
│   └── people/
│       ├── api.ts            chamadas HTTP de cada rota
│       ├── hooks.ts          queries e mutations do TanStack Query
│       ├── validation.ts     regras de validação espelhando a API
│       └── components/       tabela, formulário, busca e diálogos
└── lib/                      instância do axios, tratamento de erros e formatação
```

## Scripts

| Comando           | O que faz                     |
|-------------------|-------------------------------|
| `npm run dev`     | Servidor de desenvolvimento   |
| `npm run build`   | Checagem de tipos e build     |
| `npm run lint`    | ESLint                        |
| `npm run preview` | Serve o build de produção     |
