import React from 'react'

export default function Footer() {
  return (
    <div className="footer">
      <div>
        <a href="https://www.facebook.com/Yanchimkee/">
          <img className="social" alt="facebook" src="/api/images/main/facebook.png"/></a>
        <a href="https://www.instagram.com/yanchimkee/">
          <img className="social" alt="instagram" src="/api/images/main/instagram.png"/></a>
        <span id="companyName">yanchimkee</span>
        <p style={{marginTop: 10 }}>Copyright © 2019 by Yan Chim Kee Hong Kong Limited. All rights reserved</p>
      </div>
    </div>
  )
}
