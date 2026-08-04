pipeline {

    agent any

    environment {
        IMAGE_NAME = "nodejs-local"
        CONTAINER_NAME = "nodejs-app"
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ohadd306/nodejs-webapp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh """
                docker build \
                -t ${IMAGE_NAME}:${IMAGE_TAG} \
                -t ${IMAGE_NAME}:latest .
                """
            }
        }

        stage('Stop Old Container') {
            steps {
                sh """
                docker stop ${CONTAINER_NAME} || true
                docker rm ${CONTAINER_NAME} || true
                """
            }
        }

        stage('Deploy') {
            steps {
                sh """
                docker run -d \
                  --name ${CONTAINER_NAME} \
                  -p 3000:3000 \
                  --restart unless-stopped \
                  ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                sh "docker ps"
            }
        }

    }

    post {
        success {
            echo "Application deployed successfully."
        }

        failure {
            echo "Deployment failed."
        }
    }

}
