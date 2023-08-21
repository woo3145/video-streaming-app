// CRA를 사용하여 프로젝트를 생성한 경우 webpack 설정을 수정하려면 eject로 webpack 설정파일을 꺼내야함.
// eject를 사용하면 CRA에서 내부에 감춰진 추상화된 설정파일들이 추출되어 디렉토리에 수정 가능하도록 보여준다.
// 이는 프로젝트 요구사항에 맞도록 설정파일에 대한 완전한 제어 권한을 얻지만 되돌릴 수 없으며 프로젝트의 복잡성이 증가한다.

// react-app-rewired를 사용하면 eject를 실행하지 않고 CRA 설정에 override 하여 변경할 수 있다.

module.exports = {
  webpack: (config, env) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        // webpack v5 이전에는 Node 코어 모듈의 polyfill을 자동으로 포함했지만,
        // 현재는 포함하지 않음. 따라서 Node의 코어 모듈에 대한 polyfill이 필요한 경우
        // 직접 추가해야함.

        // 현재 프로젝트에서 bcrypt를 브라우저에서 사용 중이므로, Node.js의 crypto 모듈의 브라우저 버전을 추가해야함
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        // 이 외에 필요한 polyfill 모듈을 추가 가능
      },
    };
    return config;
  },
};
