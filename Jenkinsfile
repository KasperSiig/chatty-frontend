def projectName = 'chatty'
def repository = '' // Leave blank for docker hub. NOTE: End with semicolon if filled

pipeline {
  environment {
    DOCKER = credentials("docker")
  }
  agent {
    kubernetes {
      label 'app'
      defaultContainer 'jnlp'
      yaml """
          apiVersion: v1
          kind: Pod
          metadata:
            labels:
              component: ci
          spec:
            serviceAccount: jenkins
            containers:
              - name: node
                image: kasperns/node-jenkins  
                command:
                  - cat
                tty: true
              - name: docker
                image: gcr.io/cloud-builders/docker
                command:
                  - cat
                tty: true
                volumeMounts:
                  - name: dockersock
                    mountPath: /var/run/docker.sock
              - name: kubectl
                image: gcr.io/cloud-builders/kubectl
                command:
                  - cat
                tty: true
            volumes:
            - name: dockersock
              hostPath:
                path: /var/run/docker.sock
        """
    }
  }
  stages {
    stage('Test') {
      steps {
        container('node') {
          sh("yarn install")
          sh("yarn test")
          sh("yarn buildprod")
          junit 'src/test-results/**/*.xml'
          cobertura autoUpdateHealth: false, autoUpdateStability: false, coberturaReportFile: '**/cobertura.xml', conditionalCoverageTargets: '70, 0, 0', failUnhealthy: false, failUnstable: false, lineCoverageTargets: '80, 0, 0', maxNumberOfBuilds: 0, methodCoverageTargets: '80, 0, 0', onlyStable: false, sourceEncoding: 'ASCII', zoomCoverageChart: false
        }
      }
    }
    stage('Build') {
      steps {
        container('docker') {
          sh("docker login -u $DOCKER_USR -p $DOCKER_PSW")
          sh("docker build -t ${repository}$DOCKER_USR/${projectName} .")
          sh("docker push ${repository}$DOCKER_USR/${projectName}")
        }
      }
    }
  }
}
