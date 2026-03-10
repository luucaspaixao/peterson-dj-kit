# 🎧 DJ Digital Press Kit — Com Painel Admin

Site estático com **Decap CMS** integrado. O DJ edita textos, fotos e links
pelo painel admin (`/admin`) sem nunca tocar no código ou layout.

---

## 📁 Estrutura do Projeto

```
dj-site/
├── build.js                    ← Script que gera o HTML final
├── netlify.toml                ← Config de deploy (Netlify)
├── package.json
├── public/
│   └── admin/
│       ├── index.html          ← Página do painel admin
│       └── config.yml          ← Campos editáveis do CMS
├── src/
│   ├── content/
│   │   └── site-content.json   ← ✏️ TODO O CONTEÚDO EDITÁVEL
│   └── template.html           ← Layout do site (NÃO EDITAR)
└── dist/                       ← Gerado pelo build (não commitar)
```

---

## 🚀 Como Fazer o Deploy (Passo a Passo)

### 1. Criar o repositório no GitHub

```bash
cd dj-site
git init
git add .
git commit -m "feat: DJ press kit inicial"
gh repo create dj-press-kit --public --push
```

### 2. Deploy no Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em **"Add new site" → "Import an existing project"**
3. Conecte ao GitHub e selecione o repositório `dj-press-kit`
4. O Netlify vai detectar o `netlify.toml` automaticamente
5. Clique em **Deploy site**

### 3. Ativar o Netlify Identity (para o login do admin)

1. No painel do Netlify, vá em **Site configuration → Identity**
2. Clique em **Enable Identity**
3. Em **Registration**, selecione **Invite only**
4. Em **Services → Git Gateway**, clique em **Enable Git Gateway**
5. Vá em **Identity → Invite users** e convide o email do DJ

### 4. Acessar o Painel Admin

O DJ acessa: `https://seu-site.netlify.app/admin`

Ele verá um painel com todos os campos organizados:
- ⚙️ **Site / Hero** — Nome, tagline, textos do hero
- 👤 **Sobre** — Foto, bio, gêneros
- 🎵 **Releases** — Adicionar/editar/remover músicas
- 📸 **Galeria** — Upload de fotos
- 🎬 **Vídeos** — Thumbnails e links do YouTube
- 📦 **Press Kit** — Upload de arquivos (ZIP, PDF, MP4)
- 📧 **Contato** — Email, Instagram
- 🔗 **Redes Sociais** — URLs do Spotify, SoundCloud, etc.

---

## 🔄 Fluxo de Edição

```
DJ edita no painel admin (/admin)
         ↓
Decap CMS commita as mudanças no GitHub
         ↓
Netlify detecta o commit
         ↓
Roda `node build.js` automaticamente
         ↓
Site atualizado em ~30 segundos ✅
```

---

## 🖼️ Imagens

Coloque as imagens iniciais em `public/images/`:

```
public/images/
├── dj-portrait.jpg          ← Foto principal do About
├── releases/
│   ├── neon-nights.jpg      ← Capas dos releases
│   ├── void-walker.jpg
│   ├── data-stream.jpg
│   └── glitch-ghost.jpg
├── gallery/
│   ├── photo-01.jpg         ← Fotos da galeria
│   ├── photo-02.jpg
│   ├── photo-03.jpg
│   └── photo-04.jpg
├── videos/
│   ├── recode-festival.jpg  ← Thumbnails dos vídeos
│   └── blueprint-underground.jpg
└── downloads/
    ├── EPK_ASSETS.zip       ← Arquivos do Press Kit
    ├── TECH_RIDER.pdf
    └── VIDEO_REEL.mp4
```

Depois do deploy, o DJ pode substituir essas imagens pelo próprio admin.

---

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Gerar o site
npm run build

# Rodar localmente
npx serve dist
```

---

## 💡 Customização do Layout

Se você (desenvolvedor) quiser alterar o layout, edite `src/template.html`.
Os placeholders usam a sintaxe `{{campo}}` e são substituídos pelo `build.js`.

O DJ **nunca precisa tocar** nesses arquivos — apenas no painel admin.

---

## 📋 Formulário de Contato

O formulário já está configurado com `data-netlify="true"`.
No plano gratuito do Netlify, você recebe até **100 envios/mês**.
Os envios aparecem em: **Netlify → Forms → booking**

---

## 🌐 Domínio Customizado

Para usar um domínio próprio (ex: `djcybercore.com`):
1. No Netlify, vá em **Domain management → Add custom domain**
2. Siga as instruções para apontar o DNS
3. HTTPS é ativado automaticamente (Let's Encrypt)

---

## 💰 Custo Total

| Item | Custo |
|------|-------|
| Netlify (hosting + CMS + forms) | **Grátis** |
| Domínio .com (opcional) | ~R$40/ano |
| **Total** | **R$0 a R$40/ano** |
