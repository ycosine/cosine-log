export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '2rem',
      textAlign: 'center' 
    }}>
      <div>
        <h1 style={{ fontSize: '4rem', margin: '0 0 1rem 0' }}>404</h1>
        <h2 style={{ fontSize: '2rem', margin: '0 0 1rem 0' }}>页面不存在</h2>
        <p style={{ fontSize: '1.125rem', margin: '0 0 2rem 0' }}>
          抱歉，您要访问的页面不存在或已被删除。
        </p>
        <a 
          href="/" 
          style={{ 
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0ea5e9',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '500'
          }}
        >
          返回首页
        </a>
      </div>
    </div>
  )
}