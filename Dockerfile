FROM public.ecr.aws/amazonlinux/amazonlinux:2023

# Fix the curl conflict first
RUN yum update -y && \
    yum remove -y curl-minimal && \
    yum install -y curl unzip tar git gzip which shadow-utils && \
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    yum install -y nodejs

# Create and switch to amplify user
RUN useradd -m amplify
USER amplify
WORKDIR /home/amplify/app

COPY --chown=amplify . .

RUN npm ci
RUN npm run build

CMD ["echo", "✅ Amplify Build Simulation Success"]
