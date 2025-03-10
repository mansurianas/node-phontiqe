pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }

    environment {
        DOCKER_IMAGE = "lucky0111/nodejs"
        DOCKER_TAG = "latest"
        KUBE_NAMESPACE = "nodejs"
        KUBE_DEPLOYMENT = "nodejs-deployment"
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Cloning the code from the repository
                git branch: 'main', url: 'https://github.com/mansurianas/node-phontiqe.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Building the Docker image
                    sh 'docker build -t $DOCKER_IMAGE:$DOCKER_TAG .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                script {
                    // Logging into DockerHub securely using Jenkins credentials
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Pushing the Docker image to DockerHub
                    sh 'docker push $DOCKER_IMAGE:$DOCKER_TAG'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                   // Using the kubeconfig secret file from Jenkins credentials
                    withCredentials([file(credentialsId: 'kube_config_id', variable: 'KUBECONFIG_PATH')]) {
                        // Set the KUBECONFIG environment variable to the path of the secret file
                        sh '''
                        export KUBECONFIG=$KUBECONFIG_PATH
                        
                        kubectl apply -f k8s/namespace.yml
                        kubectl apply -f k8s/deployment.yml
                        kubectl apply -f k8s/service.yml
                        '''
                    }
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    // Verifying if the pods are running
                    withCredentials([file(credentialsId: 'kube_config_id', variable: 'KUBECONFIG_PATH')]) {
                        sh '''
                        export KUBECONFIG=$KUBECONFIG_PATH
                        kubectl get pods -n $KUBE_NAMESPACE
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up Docker images to free space
            sh 'docker rmi $DOCKER_IMAGE:$DOCKER_TAG || true'
        }
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
