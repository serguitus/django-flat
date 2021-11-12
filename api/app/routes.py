import json
import time

from flask import request
from git import Repo
from git.util import Actor

from app import app, db
from app.forms import PrForm
from app.models import PR

repo_route = app.config['REPO_PATH']


# the active repo
@app.route('/')
@app.route('/repo')
def get_repo():
    repo = Repo(repo_route)
    config = repo.config_reader()
    return {'repo': repo._working_tree_dir,
            'active_committer': config.get_value("user", "email")}


# the list of branches
@app.route('/branches')
def get_branches():
    repo = Repo(repo_route)
    return {'branches': [br.name for br in repo.heads]}


# the last 50 commits of some branch
@app.route('/commits/<branch>')
def get_commits(branch):
    repo = Repo(repo_route)
    commits = list(repo.iter_commits(branch, max_count=50))
    return {'commits': [{
        'id': commit.hexsha,
        'message': commit.message,
        'author': commit.author.name,
        'date': time.strftime("%a, %d %b %Y %H:%M", time.gmtime(commit.authored_date))} for commit in commits]}


# some commit details
@app.route('/commit/<commitId>')
def get_commit_by_id(commitId):
    repo = Repo(repo_route)
    #selected_branch = repo.heads[branch]
    commit = repo.commit(commitId)
    return {'commit': {
        'id': commit.hexsha,
        'message': commit.message,
        'author_name': commit.author.name,
        'author_email': commit.author.email,
        'date': time.strftime("%a, %d %b %Y %H:%M", time.gmtime(commit.authored_date))}}


# some PR details
@app.route('/pullrequests/<pr_id>')
def get_pr_by_id(pr_id):
    #repo = Repo(repo_route)
    #selected_branch = repo.heads[branch]
    pr = PR.query.filter_by(id=pr_id)
    #commit = repo.commit(commitId)
    pr = pr.first()
    author = pr.author and pr.author.name
    return {'pullRequest': {
        'id': pr.id,
        'title': pr.title,
        'description': pr.description,
        'author': author,
        'status': pr.status
        }
    }

# PR list
@app.route('/pullrequests', methods=['POST', 'GET'])
def pullRequest():
    print(request.get_json())
    repo = Repo(repo_route)
    form = PrForm()

    if form.validate_on_submit():
        print('aqui tambien...')
        pr = PR(
            title=form.title.data,
            description=form.description.data,
            base_branch=form.base_branch.data,
            compare_branch=form.compare_branch.data,
            author=repo.config_reader().get_value("user", "email"))
        db.session.add(pr)
        db.session.commit()
        # print(pr)
        return 'OK'
    # it's a GET. get PR in db
    pullrequests = PR.query.all()
    return {
        'prs': [{
            "id": pr.id,
            "title": pr.title,
            "description": pr.description,
            "author": pr.author,
            "status": pr.status,
            "baseBranch": pr.base_branch,
            "compareBranch": pr.compare_branch
            } for pr in pullrequests]
        }
