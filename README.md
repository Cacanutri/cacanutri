# SiteOps (MVP)

## Como rodar local
1) Suba o Postgres
```bash
docker compose up -d
```

2) Configure o arquivo `.env` baseado em `.env.example`

3) Instale dependencias
```bash
npm install
```

4) Rode migracoes e seed
```bash
npm run prisma:migrate
npm run prisma:seed
```

5) Rode o app
```bash
npm run dev
```

Acesse `http://localhost:3000`.

## Variaveis de ambiente
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `UPLOAD_DIR`

## Fluxo do sistema
- Cliente cria conta, faz checkout mock e cria projeto
- Completa onboarding com dados e uploads
- A equipe acompanha tarefas e chamados no painel admin
- Chamados sao respondidos por staff/admin

## Admin demo
- Email: admin@siteops.local
- Senha: admin123

## Criar novo template de onboarding
1) Edite `components/onboarding/OnboardingForm.tsx`
2) Adicione o novo bloco condicional por categoria
3) Salve os dados no `data` do intake
4) Se precisar de validacao, ajuste `lib/validators.ts`

## Deploy (pronto para Vercel + Render)
- Configure as variaveis acima no ambiente
- Postgres em Render: atualize `DATABASE_URL`
