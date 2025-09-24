import SharkLogo from "./components/SharkLogo";
import HeroSlider from "./components/HeroSlider";

function App() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <a href="#">고객센터</a>
            <a href="#">마이페이지</a>
            <a href="#">관심</a>
            <a href="#">알림</a>
            <a href="#">로그인</a>
          </div>
          <div className="header-main">
            <div
              className="logo"
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <SharkLogo size={26} />
              <span>Shark</span>
            </div>
            <nav className="nav">
              <a href="#" className="active">
                HOME
              </a>
              <a href="#">STYLE</a>
              <a href="#">SHOP</a>
            </nav>
            <div className="actions">
              <input
                className="search"
                placeholder="찾고 싶은 브랜드, 상품을 검색해보세요"
              />
              <span>🛒</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-box">
              <HeroSlider />
            </div>
          </div>
        </section>

        <div className="container">
          <section className="cat-row">
            {categories.map((c) => (
              <div className="cat-item" key={c.name}>
                <div className="cat-thumb">
                  <img src={c.icon} alt={c.name} />
                </div>
                {c.name}
              </div>
            ))}
          </section>

          <section className="section">
            <div className="section-title">지금 가장 주목받는 신상</div>
            <div className="grid">
              {mockProducts.slice(0, 12).map((p) => (
                <article className="card" key={p.id}>
                  <div className="card-img">
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <div className="brand">{p.brand}</div>
                    <div className="name">{p.name}</div>
                    <div className="price">{p.price.toLocaleString()}원</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <h4>이용안내</h4>
            <ul>
              <li>검수기준</li>
              <li>이용정책</li>
              <li>패널티 정책</li>
              <li>커뮤니티 가이드라인</li>
            </ul>
          </div>
          <div>
            <h4>고객지원</h4>
            <ul>
              <li>공지사항</li>
              <li>서비스 소개</li>
              <li>스토어 안내</li>
              <li>판매자 방문접수</li>
            </ul>
          </div>
          <div>
            <h4>ABOUT 샤크</h4>
            <ul>
              <li>회사소개</li>
              <li>인재채용</li>
              <li>제휴문의</li>
            </ul>
          </div>
          <div>
            <h4>고객센터 1588-7813</h4>
            <div>운영시간 평일 10:00 - 18:00</div>
            <div>점심시간 평일 13:00 - 14:00</div>
            <div>1:1 문의하기는 앱에서만 가능합니다.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const mockProducts = Array.from({ length: 24 }).map((_, idx) => ({
  id: idx + 1,
  brand: ["Adidas", "Nike", "New Era", "Salomon", "Stanley", "The North Face"][
    idx % 6
  ],
  name: `샤크 스포츠 웨어 ${idx + 1}`,
  price: 69000 + (idx % 5) * 5000,
  imageAlt: "상품 이미지",
  image: `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop&ixid=${idx}`,
}));

const categories = [
  {
    name: "신발",
    icon: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "의류",
    icon: "https://images.unsplash.com/photo-1520975682031-6a03d0d4a37f?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "가방",
    icon: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "모자",
    icon: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "액세서리",
    icon: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "러닝",
    icon: "https://images.unsplash.com/photo-1542295468-1f4f6c1cbfd6?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "트레이닝",
    icon: "https://images.unsplash.com/photo-1534367610401-9f7dd3a2d58b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "아웃도어",
    icon: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "축구",
    icon: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "농구",
    icon: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "요가",
    icon: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "골프",
    icon: "https://images.unsplash.com/photo-1617957743095-6e59f7310f2e?q=80&w=400&auto=format&fit=crop",
  },
];

export default App;
