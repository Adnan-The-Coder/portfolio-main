FROM public.ecr.aws/amazonlinux/amazonlinux:2023

# Install Node.js 18 (same as AWS Amplify)
RUN yum update -y && \
    yum install -y curl unzip tar git gzip which shadow-utils && \
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    yum install -y nodejs

RUN useradd -m amplify
USER amplify
WORKDIR /home/amplify/app

COPY --chown=amplify . .

RUN npm ci
RUN npm run build

CMD ["echo", "✅ Amplify Build Simulation Success"]
