import './BlogSection.css';

function BlogSection({ id, posts }) {
  return (
    <section className="blog-shell section-shell" id={id}>
      <div className="section-header">
        <div>
          <h2 className="section-title">Latest from the blog</h2>
          <p className="section-subtitle">Short, useful reads to keep the storefront feeling complete.</p>
        </div>
        <a className="section-link" href="#top">
          Read all articles
        </a>
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <article className="blog-card" key={post.title}>
            <img src={post.image} alt={post.title} />
            <div className="blog-copy">
              <h3>{post.title}</h3>
              <p>{post.text}</p>
              <a href="#top">Continue reading</a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;
