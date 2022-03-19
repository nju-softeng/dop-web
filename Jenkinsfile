#!/groovy
pipeline{
	agent any

	environment {
        REPOSITORY = "https://github.com/nju-softeng/dop-web.git"
		SERVICE_DIR="./"
        DOCKER_REGISTRY_HOST = "172.29.7.157:85"
        DOCKER_REGISTRY = "172.29.7.157:85/dop/dop-web"
	}

	stages {
        stage('pull code') {
			steps {
				echo "start fetch code from git:${REPOSITORY}"
				deleteDir()
				//git "${REPOSITORY}"
                checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: "${REPOSITORY}"]]])
                script {
                    time = sh(returnStdout: true, script: 'date "+%Y%m%d%H%M"').trim()
                    git_version = sh(returnStdout: true, script: 'git log -1 --pretty=format:"%h"').trim()
                    build_tag = time+git_version
                }
			}
		}

        stage('build docker') {
			steps {
                echo "start build image"
                echo "image tag : ${build_tag}"
                dir(SERVICE_DIR){
                    sh "ls -l"
                    sh "docker build -t ${DOCKER_REGISTRY}:${build_tag} --network host ."
                }
			}
		}

        stage('push docker') {
            steps {
                echo "start push image"
                dir(SERVICE_DIR){
                  sh "ls -l"
                  withCredentials([usernamePassword(credentialsId: 'docker_registry', passwordVariable: 'password', usernameVariable: 'username')]) {
                      sh "docker login -u ${username} -p ${password} ${DOCKER_REGISTRY_HOST}"
                      sh "docker push ${DOCKER_REGISTRY}:${build_tag}"
                  }
                }
            }
        }

        stage('update yaml') {
            steps{
                echo "start change yaml image tag"
                dir(SERVICE_DIR){
                    sh "ls -l"
                    sh "sed -i 's/<BUILD_TAG>/${build_tag}/' k8s.yaml"
                    sh "cat k8s.yaml"
                }
            }
        }

        stage('deploy') {
			steps {
				echo "start deploy"
				dir(SERVICE_DIR){
				    sh "ls -l"
				    sh "kubectl apply -f k8s.yaml"
				}
			}
		}
	}
}
