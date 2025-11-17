export const metadata = {
  title: 'DS - Data Structures Visualizer',
  description: 'Interactive data structures visualization tool',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
