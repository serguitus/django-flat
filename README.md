# Instructions to execute the solution:

To execute the project locally please take the steps bellow:

```
> git clone git@github.com:serguitus/django-flat.git

> cd django-flat

> npm install

> cd api

> python3 -m venv env

> . ./env/bin/activate

> pip install -r requirements.txt

> flask db upgrade


```

you need also to set the git repo address at the config file. visit app/config.py and search for

``` REPO_PATH=os.environ.get('REPO_PATH') or '/home/sergio/technical_interviews/flat.mx/django-flat/' ```

update the route accordingly or add an environment variable with the route of your repo

so far apps are installed. let's run them.... fingers crossed :)

You will need two terminals for running back and front respectively.
Open the first one, go to the root dir of the project and type

```
> npm run start-api
```

Open a second one, also at the root dir run

```
> npm start
```
That's it! You should be able to access localhost:3000 and visit the available views:
- list branches
- view branch details
- view commit details
- list PRs
- add PR

## Known issues:

- There are failures in the merge action. It needs to be fixed
- there is a message variable in component state to visualize errors in merge but it is not used as the merge process is incomplete
- there are no styles at all (left intentionally as other requirements were pending)
- I had no time to work on tests
- there is an issue with saving the PR state to DB (the value passed does not correspond with the defined Enum)

Thanks for your time :)

# fullstack-interview-test
Interview test for fullstack Software Engineers

## Welcome!
If you're reading this, it means we're interested in working with you and solving amazing and difficult problems in real-estate tech in Mexico.

This README provides the instructions to a small, self-contained test for a FullStack Software Engineer position.

## What we're looking for
We're looking for a talented and driven full-stack engineer, comfortable with building responsive front end experiences, as well as with designing and building rigorous APIs and backend services.

This means that this test is designed to gather signal on your coding structure, the tradeoffs and decisions you make on API design, and how you build a lightweight frontend app to show the data coming from your API. We're excited to see what you build!

## The test
Today, we'll be building an API wrapper around the git information of this project. We suggest forking this repo and start working on it on your private fork, the url of which is the only thing you need to send us when you're done.

The main objects we'll be dealing with are:
- Commits
- Authors
- Branches
- PRs

We'd like to see a visual representation of the git history of this repo as a **JS web-app**, using the API previously described. To be specific, we'd like to see the following:
- A view where we can see the existing branches
- A branch detail view where we can see all the commits to one specific branch, with commit messages, authors and timestamps.
- A commit detail view where we can see the commit message, timestamp, number of files changed and author names / emails.
- A "PR" create view, where we can choose two branches (base and compare), and merge them together, just like Pull Requests work in Github.
- A "PR" list view, where we see all created PRs and the following info: Author, Title, Description and Status (`Open`, `Closed`, `Merged`). If the status is `Open`, there should be a button that allows us to mark it as `Closed`.

For the **PR create view**, we'll ask the user for a PR title and description, and we'll give them 2 options: either save it (Status = `Open`), or merge it. Note that merge operations can fail due to conflicts or other reasons, so make sure you handle and show whatever error happens when merging. There's no need to do something about these errors other than show them in the frontend. After a successful merge, the PR should move to a `Merged` status.

## Deliverables
We expect this test to take around 4 hours, but not significantly more (your time is very valuable!). We're giving you a week from the date you receive it to complete it and send us your repo URL, using **whatever stack you feel most comfortable with**. Due to this, we ask that you also provide a `README` with instructions for running your project, both back and frontend, along with setup instructions (or provide a Dockerfile and a `docker run` instruction).

It's up to you to design how this should look code-wise, but we don't expect you to model all git objects in a DB. We're ok with reading them using a library wrapper for git like [GitPython](https://gitpython.readthedocs.io/en/stable/), on-demand. The only DB design required is the one for PRs.

## Grading
We'll grade this project according to completion percentage of the features requested, good coding style for both back and frontend. For us, good coding means:
- It's readable. We read code much more often than we write it, so it's important that we're clear on what we're doing and comment any hairy parts (which we don't really expect to have in this test!).
- It's reasonably well ordered and with a logically thought-out structure. We like to do separation of concerns, and deal with routing, DB models, serialization, etc in their own file structure / files.
- Clear, understandable variable names. No one wants to read the whole file to understand what the variable `c1_2` means.

We also care about being able to run your test without significant effort on our part, so make sure you test the instructions you provide on your README.

### Things we won't be grading
- Design chops: we care that you know enough CSS not to be surprised when you need to work on it, but we're not picky about your solution's UX/UI.

### Bonus points
- Your code has tests.

If you come across any questions or anything we didn't cover on this README, feel free to reach out to us and we'll get you an answer as soon as possible. Happy coding!
