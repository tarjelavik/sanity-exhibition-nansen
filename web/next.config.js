module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgo: false, // Optimization caused bugs with some of my SVGs
            },
          },
        ],
    });
    return config
  }
  /* basePath: '/exhibition',
  async redirects() {
    return [
      {
        source: '/exhibition',
        destination: '/exhibition/chk',
        permanent: true,
      },
    ]
  }, */
}