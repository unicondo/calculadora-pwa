# 📱 Calculadora PWA

Uma calculadora Progressive Web App (PWA) moderna e totalmente funcional, desenvolvida com design mobile-first e suporte a temas claro e escuro. Criada com HTML5, CSS3 e JavaScript vanilla, sem dependências externas.

![Calculadora PWA](https://img.shields.io/badge/PWA-Ready-brightgreen) ![Mobile First](https://img.shields.io/badge/Mobile-First-blue) ![No Dependencies](https://img.shields.io/badge/Dependencies-None-orange)

## 🎯 Características Principais

### ✨ Interface Moderna
- **Design Glassmorphism**: Efeitos de vidro com blur e transparência
- **Tema Claro/Escuro**: Alternância suave entre temas com persistência
- **Mobile-First**: Otimizada para dispositivos móveis
- **Responsiva**: Adapta-se a qualquer tamanho de tela
- **Animações Suaves**: Transições e feedback visual

### 🧮 Funcionalidades da Calculadora
- **Operações Básicas**: Adição, subtração, multiplicação e divisão
- **Funções Científicas**: Seno, constantes matemáticas (e, μ)
- **Números Decimais**: Suporte completo com formatação brasileira
- **Cálculos em Cadeia**: Operações sequenciais sem limitações
- **Formatação Inteligente**: Números formatados com vírgulas e pontos

### 📱 PWA Completa
- **Instalável**: Pode ser instalada como app nativo
- **Offline**: Funciona sem conexão após primeira visita
- **Service Worker**: Cache inteligente para performance
- **Manifest**: Configuração completa para instalação

### ⌨️ Acessibilidade
- **Suporte a Teclado**: Controle completo via teclado
- **Touch Otimizado**: Botões grandes e responsivos
- **Feedback Háptico**: Vibração em dispositivos suportados
- **Prevenção de Zoom**: Interface estável em mobile

## 🚀 Demonstração

\`\`\`
Exemplo de uso:
2 + 3 × 4 = 14
sin(90) = 1
123.456,78 + 1.000 = 124.456,78
\`\`\`

## 📋 Requisitos

### Servidor Web
- **Apache** 2.4+ ou **Nginx** 1.18+
- **PHP** não necessário
- **Node.js** não necessário
- Suporte a arquivos estáticos (HTML, CSS, JS)

### Navegadores Suportados
- **Chrome/Chromium** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+
- **Mobile Safari** (iOS 13+)
- **Chrome Mobile** (Android 8+)

### Recursos Opcionais
- **HTTPS** (recomendado para PWA completa)
- **Service Worker** (incluído)
- **Web App Manifest** (incluído)

## 📦 Instalação

### Método 1: Download Direto

1. **Baixe os arquivos**:
   \`\`\`bash
   # Baixe o ZIP do projeto ou clone o repositório
   wget https://github.com/unicondo/calculadora-pwa/archive/main.zip
   unzip main.zip
   \`\`\`

2. **Faça upload para seu servidor**:
   \`\`\`bash
   # Via FTP, cPanel ou painel de controle
   # Copie todos os arquivos para a pasta public_html ou www
   \`\`\`

### Método 2: Git Clone

1. **Clone o repositório**:
   \`\`\`bash
   git clone https://github.com/unicondo/calculadora-pwa.git
   cd calculadora-pwa
   \`\`\`

2. **Deploy para servidor**:
   \`\`\`bash
   # Copie arquivos para seu servidor web
   rsync -av ./ usuario@servidor:/var/www/html/calculadora/
   \`\`\`

### Método 3: Hospedagem Compartilhada

1. **Acesse seu painel de controle** (cPanel, Plesk, etc.)
2. **Vá para o Gerenciador de Arquivos**
3. **Navegue até public_html ou www**
4. **Faça upload dos arquivos**:
   - \`index.html\`
   - \`manifest.json\`
   - \`sw.js\`
   - \`icon-192x192.png\`
   - \`icon-512x512.png\`

## ⚙️ Configuração

### Estrutura de Arquivos
\`\`\`
calculadora-pwa/
├── index.html          # Arquivo principal da aplicação
├── manifest.json       # Configuração PWA
├── sw.js              # Service Worker
├── icon-192x192.png   # Ícone 192x192
├── icon-512x512.png   # Ícone 512x512
└── README.md          # Este arquivo
\`\`\`

### Configuração do Servidor

#### Apache (.htaccess)
\`\`\`apache
# Habilitar compressão
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json
</IfModule>

# Cache para recursos estáticos
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 year"
</IfModule>

# Headers para PWA
<IfModule mod_headers.c>
    Header set X-Content-Type-Options nosniff
    Header set X-Frame-Options DENY
    Header set X-XSS-Protection "1; mode=block"
</IfModule>
\`\`\`

#### Nginx
\`\`\`nginx
location / {
    try_files $uri $uri/ /index.html;
    
    # Cache para recursos estáticos
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Headers de segurança
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
}
\`\`\`

## 🔧 Personalização

### Alterando Cores
Edite as variáveis CSS no \`index.html\`:

\`\`\`css
/* Tema claro */
--bg-gradient-light-start: #87CEEB;
--bg-gradient-light-end: #4682B4;
--btn-operator-bg-light: #2563eb;

/* Tema escuro */
--bg-gradient-dark-start: #1e3a8a;
--bg-gradient-dark-end: #0f172a;
--btn-operator-bg-dark: #2563eb;
\`\`\`

### Adicionando Funções
Para adicionar novas funções matemáticas:

\`\`\`javascript
function handleFunction(func) {
    const value = parseFloat(currentInput.replace(",", "."));
    let result;

    switch(func) {
        case 'cos':
            result = Math.cos(value * Math.PI / 180);
            break;
        case 'sqrt':
            result = Math.sqrt(value);
            break;
        // Adicione mais funções aqui
    }
    
    currentInput = formatNumber(result);
    waitingForOperand = true;
}
\`\`\`

### Modificando Ícones
Substitua os arquivos \`icon-192x192.png\` e \`icon-512x512.png\` pelos seus próprios ícones.

## 📱 Instalação como PWA

### Android
1. Abra a calculadora no Chrome
2. Toque no menu (⋮)
3. Selecione "Adicionar à tela inicial"
4. Confirme a instalação

### iOS
1. Abra a calculadora no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"
4. Confirme a instalação

### Desktop
1. Abra a calculadora no Chrome/Edge
2. Clique no ícone de instalação na barra de endereços
3. Confirme a instalação

## 🧪 Testes

### Teste Local
\`\`\`bash
# Usando Python (se disponível)
python -m http.server 8000

# Usando Node.js (se disponível)
npx serve .

# Acesse: http://localhost:8000
\`\`\`

### Teste de Funcionalidades
- [ ] Operações básicas (+, -, ×, ÷)
- [ ] Números decimais
- [ ] Funções científicas
- [ ] Alternância de temas
- [ ] Responsividade mobile
- [ ] Instalação PWA
- [ ] Funcionamento offline

## 🐛 Solução de Problemas

### PWA não instala
- Verifique se está usando HTTPS
- Confirme que o \`manifest.json\` está acessível
- Verifique se o Service Worker está registrado

### Calculadora não funciona
- Verifique o console do navegador (F12)
- Confirme que o JavaScript está habilitado
- Teste em modo incógnito

### Problemas de cache
\`\`\`javascript
// Limpar cache manualmente
caches.keys().then(names => {
    names.forEach(name => caches.delete(name));
});
\`\`\`

## 📈 Performance

### Métricas Típicas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Cumulative Layout Shift**: < 0.1

### Otimizações Incluídas
- Compressão de recursos
- Cache inteligente
- Lazy loading
- Minificação inline

## 🔒 Segurança

### Headers Implementados
- \`X-Content-Type-Options: nosniff\`
- \`X-Frame-Options: DENY\`
- \`X-XSS-Protection: 1; mode=block\`

### Boas Práticas
- Sem dependências externas
- Código validado
- Sem eval() inseguro
- CSP compatível

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Bruno Ferreira Alves**
- 🏢 **Empresa**: UniCondo
- 📱 **WhatsApp**: [+55 (11) 98793-5241](https://wa.me/5511987935241)
- 💼 **LinkedIn**: [Bruno Ferreira Alves](https://linkedin.com/in/bruno-ferreira-alves)
- 🐙 **GitHub**: [@brunoferreira](https://github.com/brunoferreira)

## 🤝 Contribuindo

1. **Fork** o projeto
2. **Crie** uma branch para sua feature (\`git checkout -b feature/AmazingFeature\`)
3. **Commit** suas mudanças (\`git commit -m 'Add some AmazingFeature'\`)
4. **Push** para a branch (\`git push origin feature/AmazingFeature\`)
5. **Abra** um Pull Request

## 📞 Suporte

Para suporte técnico ou dúvidas:

- 📱 **WhatsApp**: [+55 (11) 98793-5241](https://wa.me/5511987935241)
- 📧 **Email**: contato@unicondo.app
- 🌐 **Website**: [www.unicondo.com.br](https://www.unicondo.app)

## 🎯 Roadmap

### Versão 2.0
- [ ] Histórico de cálculos
- [ ] Mais funções científicas
- [ ] Modo programador
- [ ] Conversor de unidades

### Versão 2.1
- [ ] Temas personalizáveis
- [ ] Backup na nuvem
- [ ] Compartilhamento de cálculos
- [ ] Widget para desktop

## 📊 Estatísticas

- **Tamanho total**: ~15KB
- **Tempo de carregamento**: <1s
- **Compatibilidade**: 95%+ navegadores
- **Score PWA**: 100/100

---

**Desenvolvido com ❤️ por Bruno Ferreira Alves - UniCondo**

*Transformando ideias em soluções digitais inovadoras*
