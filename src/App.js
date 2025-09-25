import SharkLogo from "./components/SharkLogo";
import HeroSlider from "./components/HeroSlider";
import ProductDetail from "./components/ProductDetail";
import LoginPage from "./components/LoginPage";
import MyPage from "./components/MyPage";
import ProductsPage from "./components/ProductsPage";
import SalesOverview from "./components/admin/SalesOverview";
import SalesDetail from "./components/admin/SalesDetail";
import { useMemo, useState, useEffect } from "react";

function App() {
  const [activeTab, setActiveTab] = useState("전체");
  const [page, setPage] = useState("home"); // home | category | products | login | mypage | admin-sales | admin-sales-detail
  const [activeCategoryPage, setActiveCategoryPage] = useState("의류");
  const [favorites, setFavorites] = useState(new Set());
  const [detailProduct, setDetailProduct] = useState(null);
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const filteredProducts = useMemo(() => {
    if (activeTab === "전체") return mockProducts;
    return mockProducts.filter((p) => p.category === activeTab);
  }, [activeTab]);
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-top">
            <a href="#">고객센터</a>
            {!isLoggedIn ? (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("mypage");
                }}
              >
                마이페이지
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("login");
                }}
              >
                로그인
              </a>
            )}
            <a href="#">관심</a>
            <a href="#">알림</a>
            {isLoggedIn && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(false);
                  setPage("home");
                }}
              >
                로그아웃
              </a>
            )}
          </div>
          <div className="header-main">
            <div
              className="logo"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
              onClick={() => {
                setDetailProduct(null);
                setCheckoutProduct(null);
                setPage("home");
              }}
            >
              <SharkLogo size={26} />
              <span>Shark</span>
            </div>
            <nav className="nav">
              <a
                href="#"
                className={page === "home" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setDetailProduct(null);
                  setCheckoutProduct(null);
                  setPage("home");
                }}
              >
                HOME
              </a>
              <a
                href="#"
                className={page === "products" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setDetailProduct(null);
                  setCheckoutProduct(null);
                  setPage("products");
                }}
              >
                SHOP
              </a>
              <a
                href="#"
                className={page.startsWith("admin") ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setPage("admin-sales");
                }}
              >
                ADMIN
              </a>
              <a
                href="#"
                className={page === "alerts" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setDetailProduct(null);
                  setCheckoutProduct(null);
                  setPage("alerts");
                }}
              >
                알림
              </a>
            </nav>
            <div className="actions">
              <button className="icon-btn" aria-label="검색">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0-2C6.582 2 3 5.582 3 10s3.582 8 8 8a7.96 7.96 0 0 0 4.9-1.692l4.396 4.396a1 1 0 0 0 1.414-1.414l-4.396-4.396A7.96 7.96 0 0 0 19 10c0-4.418-3.582-8-8-8Z" />
                </svg>
              </button>
              <button className="icon-btn" aria-label="장바구니">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 6h10l1.8 9.1A2 2 0 0 1 16.84 18H7.16a2 2 0 0 1-1.96-2.9L7 6Zm.5-4a1 1 0 0 1 1 1V4h7V3a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2h1V3a1 1 0 0 1 1-1Z" />
                </svg>
              </button>
              <button className="icon-btn" aria-label="메뉴">
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {checkoutProduct ? (
          <Checkout
            product={checkoutProduct}
            onBack={() => setCheckoutProduct(null)}
          />
        ) : detailProduct ? (
          <ProductDetail
            product={detailProduct}
            onBack={() => setDetailProduct(null)}
            onBuy={() => setCheckoutProduct(detailProduct)}
          />
        ) : page === "login" ? (
          <LoginPage
            onLogin={() => {
              setIsLoggedIn(true);
              setPage("home");
            }}
            onBack={() => setPage("home")}
          />
        ) : page === "mypage" ? (
          <MyPage onBack={() => setPage("home")} />
        ) : page === "products" ? (
          <ProductsPage
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDetail={(p) => setDetailProduct(p)}
          />
        ) : page === "admin-sales" ? (
          <SalesOverview
            onBack={() => setPage("home")}
            onGoDetail={() => setPage("admin-sales-detail")}
          />
        ) : page === "admin-sales-detail" ? (
          <SalesDetail onBack={() => setPage("admin-sales")} />
        ) : page === "category" ? (
          <CategoryPage
            active={activeCategoryPage}
            onChangeCategory={(c) => setActiveCategoryPage(c)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onOpenDetail={(p) => setDetailProduct(p)}
          />
        ) : (
          <>
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
                  <div
                    className="cat-item"
                    key={c.name}
                    onClick={() => {
                      setActiveCategoryPage(c.name);
                      setPage("category");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="cat-figure">
                      <img src={c.photo} alt={c.name} />
                    </div>
                    <div className="cat-text">{c.name}</div>
                  </div>
                ))}
              </section>

              <section className="section">
                <div className="section-title">지금 가장 주목받는 신상</div>
                <Tabs active={activeTab} onChange={setActiveTab} />
                <div className="grid">
                  {filteredProducts.slice(0, 12).map((p) => (
                    <article className="card" key={p.id}>
                      <button
                        className={`fav-btn${
                          favorites.has(p.id) ? " active" : ""
                        }`}
                        aria-pressed={favorites.has(p.id)}
                        onClick={() => toggleFavorite(p.id)}
                        title="관심 상품"
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M12 21s-6.716-4.21-9.193-7.44C.502 10.781 2.117 7 5.6 7c2.098 0 3.342 1.27 4.4 2.6C11.058 8.27 12.302 7 14.4 7c3.483 0 5.098 3.781 2.793 6.56C18.716 16.79 12 21 12 21z"
                            fill={
                              favorites.has(p.id)
                                ? "#ef4444"
                                : "rgba(0,0,0,0.0)"
                            }
                            stroke={
                              favorites.has(p.id)
                                ? "#ef4444"
                                : "rgba(0,0,0,0.35)"
                            }
                            strokeWidth="1.6"
                          />
                        </svg>
                      </button>
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
                        <div className="badge-row">
                          <span className="badge">{p.category}</span>
                        </div>
                        <div className="brand">{p.brand}</div>
                        <div className="name">{p.name}</div>
                        <div className="price">
                          {p.price.toLocaleString()}원
                        </div>
                        <div className="meta-row">
                          <span>관심 {p.likes}</span>
                          <span>리뷰 {p.reviews}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <section className="section">
              <div className="container">
                <div className="section-title">🏆 실시간 인기 랭킹</div>
                <Ranking />
              </div>
            </section>

            <section className="section pre-footer-gap">
              <div className="container">
                <div className="section-title">선물특가</div>
                <Deals />
                <div style={{ textAlign: "center", marginTop: 16 }}>
                  <button className="tab">전체보기 ▸</button>
                </div>
              </div>
            </section>
          </>
        )}
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

function Deals() {
  const end = new Date(Date.now() + 1000 * 60 * 60 * 13 + 1000 * 60 * 41);
  const [now, setNow] = useState(Date.now());
  const remain = Math.max(0, end.getTime() - now);
  const hh = String(Math.floor(remain / 3600000)).padStart(2, "0");
  const mm = String(Math.floor((remain % 3600000) / 60000)).padStart(2, "0");
  const ss = String(Math.floor((remain % 60000) / 1000)).padStart(2, "0");
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="deals">
      <div className="deals-aside">
        <div className="deals-title">🎁 선물특가</div>
        <div className="deals-timer">
          {hh}:{mm}:{ss}
        </div>
        <div className="deals-sub">망설이면 늦어요!</div>
      </div>
      <div className="deals-card">
        <img
          src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=900&q=80"
          alt="스포츠웨어 특가"
        />
        <button className="deal-cta">🛒 담기</button>
        <div className="deal-meta">
          <div className="deal-name">[선물특가] 런닝/트레이닝 웨어 세트</div>
          <div className="deal-price">
            <b>30%</b> 39,900원 <span className="strike">57,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Ranking() {
  const items = rankingItems;
  return (
    <>
      <div className="grid ranking-grid">
        {items.slice(0, 5).map((it, i) => (
          <article className="rank-card" key={i}>
            <div className="rank-badge">{i + 1}</div>
            <div className="rank-img">
              <img src={it.image} alt={it.name} />
              {it.sticker && <span className="rank-sticker">{it.sticker}</span>}
            </div>
            <button className="deal-cta">🛒 담기</button>
            <div className="card-body">
              <div className="name">{it.name}</div>
              <div className="price">
                <b>{it.sale}%</b> {it.price.toLocaleString()}원
                <span className="strike"> {it.origin.toLocaleString()}원</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <button className="tab">전체보기 ▸</button>
      </div>
    </>
  );
}

function Tabs({ active, onChange }) {
  const tabs = ["전체", "의류", "신발", "액세서리", "러닝", "트레이닝"];
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button
          key={t}
          className={`tab${active === t ? " active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function CategoryPage({
  active,
  onChangeCategory,
  favorites,
  onToggleFavorite,
  onOpenDetail,
}) {
  const categoriesOnly = categories.map((c) => c.name);
  const [sort, setSort] = useState("인기순");
  const [open, setOpen] = useState(false);
  const sorted = useMemo(() => {
    let list = mockProducts.filter((p) => p.category === active);
    switch (sort) {
      case "리뷰많은순":
        return list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
      case "등록일순":
        return list.sort((a, b) => (b.id || 0) - (a.id || 0));
      case "할인순":
        return list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return list.sort((a, b) => (b.pop || 0) - (a.pop || 0));
    }
  }, [active, sort]);
  return (
    <div className="container category-page">
      <div className="category-top">
        <div className="category-list">
          {categoriesOnly.map((c) => (
            <button
              key={c}
              className={`tab${active === c ? " active" : ""}`}
              onClick={() => onChangeCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="sort-select">
          <button className="sort-trigger" onClick={() => setOpen((v) => !v)}>
            <span>{sort}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M7 9l5-5 5 5"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17 15l-5 5-5-5"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {open && (
            <div className="sort-menu">
              {["인기순", "리뷰많은순", "등록일순", "할인순"].map((s) => (
                <div
                  key={s}
                  className={`sort-item${sort === s ? " active" : ""}`}
                  onClick={() => {
                    setSort(s);
                    setOpen(false);
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="grid">
        {sorted.slice(0, 30).map((p) => (
          <article
            className="card"
            key={`cat-${p.id}`}
            onClick={() => onOpenDetail(p)}
            style={{ cursor: "pointer" }}
          >
            <button
              className={`fav-btn${favorites.has(p.id) ? " active" : ""}`}
              aria-pressed={favorites.has(p.id)}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(p.id);
              }}
              title="관심 상품"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="halfRed"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="50%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 21s-6.716-4.21-9.193-7.44C.502 10.781 2.117 7 5.6 7c2.098 0 3.342 1.27 4.4 2.6C11.058 8.27 12.302 7 14.4 7c3.483 0 5.098 3.781 2.793 6.56C18.716 16.79 12 21 12 21z"
                  fill={favorites.has(p.id) ? "#ef4444" : "url(#halfRed)"}
                  stroke="#ef4444"
                  strokeWidth="1"
                />
              </svg>
            </button>
            <div className="card-img">
              <img
                src={p.image}
                alt={p.imageAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="card-body">
              <div className="brand">{p.brand}</div>
              <div className="name">{p.name}</div>
              <div className="price">{p.price.toLocaleString()}원</div>
              <div className="meta-row">
                <span>관심 {p.likes}</span>
                <span>리뷰 {p.reviews}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Checkout({ product, onBack }) {
  return (
    <div className="container checkout-page">
      <button className="tab" onClick={onBack}>
        ← 돌아가기
      </button>
      <div className="checkout-grid">
        <div className="checkout-left">
          <section className="ck-section">
            <h3>상품정보</h3>
            <div className="ck-item">
              <img src={product.image} alt={product.name} />
              <div>
                <div className="name">{product.name}</div>
                <div className="price">{product.price.toLocaleString()}원</div>
              </div>
            </div>
          </section>
          <section className="ck-section">
            <h3>주문 고객정보</h3>
            <div className="form-grid">
              <input placeholder="이름" />
              <input placeholder="휴대폰 번호" />
              <input placeholder="이메일" />
            </div>
          </section>
          <section className="ck-section">
            <h3>배송정보</h3>
            <div className="ship-tabs">
              <button className="tab active">일반 택배</button>
              <button className="tab">매장 픽업</button>
            </div>
            <div className="form-grid">
              <input placeholder="우편번호" />
              <input placeholder="주소" />
              <input placeholder="상세 주소" />
            </div>
          </section>
        </div>
        <aside className="checkout-summary">
          <h3>결제정보</h3>
          <div className="sum-row">
            <span>총 상품금액</span>
            <b>{product.price.toLocaleString()}원</b>
          </div>
          <div className="sum-row">
            <span>배송비</span>
            <b>0원</b>
          </div>
          <div className="sum-row total">
            <span>총 결제예정금액</span>
            <b>{product.price.toLocaleString()}원</b>
          </div>
          <button className="buy-btn" style={{ width: "100%" }}>
            결제하기
          </button>
        </aside>
      </div>
    </div>
  );
}

function CollectionTabs() {
  const groups = ["러닝", "트레이닝", "아웃도어"];
  const [active, setActive] = useState(groups[0]);
  const list = useMemo(() => {
    return mockProducts.filter((p) => p.category === active).slice(0, 6);
  }, [active]);
  return (
    <>
      <div className="tabs">
        {groups.map((g) => (
          <button
            key={g}
            className={`tab${active === g ? " active" : ""}`}
            onClick={() => setActive(g)}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="grid">
        {list.map((p) => (
          <article className="card" key={`collection-${p.id}`}>
            <div className="card-img">
              <img
                src={p.image}
                alt={p.imageAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
    </>
  );
}

const mockProducts = Array.from({ length: 24 }).map((_, idx) => ({
  id: idx + 1,
  brand: ["Adidas", "Nike", "New Era", "Salomon", "Stanley", "The North Face"][
    idx % 6
  ],
  name: `샤크 의류 컬렉션 ${idx + 1}`,
  price: 69000 + (idx % 5) * 5000,
  imageAlt: "상품 이미지",
  image: [
    "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=900&q=80",
  ][idx % 6],
  category: ["의류", "신발", "가방", "액세서리", "모자", "러닝"][idx % 6],
  likes: 0,
  reviews: 0,
  pop: 0,
  discount: 0,
}));

const categories = [
  {
    name: "신발",
    photo:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "의류",
    photo:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "가방",
    photo:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "모자",
    photo:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "액세서리",
    photo:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "러닝",
    photo:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "트레이닝",
    photo:
      "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "아웃도어",
    photo:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "축구",
    photo:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "농구",
    photo:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "요가",
    photo:
      "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "골프",
    photo:
      "https://images.unsplash.com/photo-1548191265-cc70d3d45ba1?q=80&w=600&auto=format&fit=crop",
  },
];

const rankingItems = [
  {
    name: "러닝화 경량 모델",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    sale: 20,
    price: 89000,
    origin: 112000,
    sticker: "FESTA DEAL",
  },
  {
    name: "트레이닝 조거 팬츠",
    image:
      "https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?auto=format&fit=crop&w=900&q=80",
    sale: 18,
    price: 36000,
    origin: 44000,
    sticker: "멤버특가",
  },
  {
    name: "퍼포먼스 드라이 티셔츠",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    sale: 15,
    price: 18900,
    origin: 22900,
    sticker: "+10% 쿠폰",
  },
  {
    name: "아웃도어 트레일 자켓",
    image:
      "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=900&q=80",
    sale: 22,
    price: 129000,
    origin: 165000,
    sticker: "HOT",
  },
  {
    name: "컴프레션 레깅스",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    sale: 28,
    price: 24900,
    origin: 34900,
    sticker: "쿠폰",
  },
];

export default App;
