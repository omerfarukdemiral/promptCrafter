
# Proje Kurulum ve Kullanım Kılavuzu

## 🚀 Proje Fikri
**Proje Adı:** Prompt Crafter 
**Açıklama:** Kullanıcıların teknoloji seçimlerine bağlı olarak Prompt oluşturma ve yönetme aracı.

## 🛠️ Seçilen Teknolojiler
### Frontend
- Next.js
- Tailwind CSS
- Redux

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### State Management
- Redux

### API
- REST

### Test Frameworkü
- Jest

### DevOps Araçları
- Docker
- GitHub Actions

## 🔧 Kurulum Adımları
### Gerekli Araçlar
- Node.js (v16 veya üzeri)
- npm veya yarn
- MongoDB

### Kurulum
1. Projeyi klonlayın:
   ```bash
   git clone [proje-repo-url]
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Ortam değişkenlerini ayarlayın:
   - `.env` dosyasını oluşturun ve şu değişkenleri doldurun:
     ```env
     MONGODB_URI=mongodb://localhost:27017/proje-veritabani
     PORT=3000
     ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

### Frontend
- **Next.js** ve **Redux** kullanılarak durum yönetimi sağlanmıştır.
- Tailwind CSS ile responsive tasarım.

### Backend
- **Express.js** ile REST API endpointleri oluşturulmuştur.

### Database
- MongoDB kullanılarak veriler saklanmıştır.

## 🔒 Ortam Değişkenleri
- `MONGODB_URI`: Veritabanı bağlantı URI'si.
- `PORT`: Sunucu portu.

## 🧪 Test
- Jest kullanılarak birim testler oluşturulmuştur.
- Testleri çalıştırmak için:
  ```bash
  npm test
  ```

## 🚀 DevOps
- **Docker** kullanarak konteynerize edin:
  ```bash
  docker build -t nextjs-proje .
  docker run -p 3000:3000 nextjs-proje
  ```

## 🤝 Katkıda Bulunma
1. Fork'layın
2. Feature branch oluşturun
3. Değişikliklerinizi commit'leyin
4. Branch'inizi push'layın
5. Pull request açın

## 📜 Lisans
Bu proje [LICENSE] altında lisanslanmıştır.
