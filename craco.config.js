// due to this problem, we use https://github.com/facebook/create-react-app/discussions/11767
module.exports = {
  webpack: {
    configure: {
      ignoreWarnings: [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes('node_modules') &&
            warning.details &&
            warning.details.includes('source-map-loader')
          );
        },
      ],
    },
  },
  devServer: {
    port: 4008,
  },
};
