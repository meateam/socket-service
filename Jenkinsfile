//socket-service
pipeline {
  agent any
    stages {
      stage('get_commit_msg') {
        steps {
          script {
            env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
            env.GIT_SHORT_COMMIT = sh(returnStdout: true, script: "git log -n 1 --pretty=format:'%h'").trim()
            env.GIT_COMMITTER_EMAIL = sh (script: "git --no-pager show -s --format='%ae'", returnStdout: true  ).trim()
            env.GIT_REPO_NAME = scm.getUserRemoteConfigs()[0].getUrl().tokenize('/')[3].split("\\.")[0]
            echo 'drivehub.azurecr.io/'+env.GIT_REPO_NAME+'/master:'+env.GIT_SHORT_COMMIT
          }
        }
      }
      stage('build image') {
        when {
            anyOf {
                branch 'master'; branch 'develop'
            }  
        }
        parallel {
          stage('build dockerfile of system only for master and develop') {
           steps {
              script{
                if(env.GIT_BRANCH == 'master') {
                  sh "docker build -t  drivehub.azurecr.io/${env.GIT_REPO_NAME}/master:${env.GIT_SHORT_COMMIT} ."
                  sh "docker push  drivehub.azurecr.io/${env.GIT_REPO_NAME}/master:${env.GIT_SHORT_COMMIT}"
                }
                else if(env.GIT_BRANCH == 'develop') {
                  sh "docker build -t  drivehub.azurecr.io/${env.GIT_REPO_NAME}/develop ."
                  sh "docker push  drivehub.azurecr.io/${env.GIT_REPO_NAME}/develop"  
                }
              }  
            }
          }
          stage('login to azure container registry') {
            steps {  
              withCredentials([usernamePassword(credentialsId:'Drive_ACR',usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                sh "docker login  drivehub.azurecr.io -u ${USER} -p ${PASS}"
              }  
            }
          }
        }
       }
    }
}

