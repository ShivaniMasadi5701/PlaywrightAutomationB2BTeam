pipeline {
    agent any

    environment {
        CI = 'true'
        BASE_URL = credentials('BASE_URL')
        LOGIN_EMAIL_ADDRESS = credentials('LOGIN_EMAIL_ADDRESS')
        LOGIN_PASSWORD = credentials('LOGIN_PASSWORD')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ShivaniMasadi5701/AutomationPractice-PlaywrightTS.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
        }
    }
}
