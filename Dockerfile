FROM public.ecr.aws/amazonlinux/amazonlinux:2023

# Use existing curl-minimal (don't install full curl to avoid conflict)
RUN yum update -y && \
    yum install -y unzip tar git gzip which shadow-utils && \
    curl -fsSL https://rpm.nodesource.com/setup_18.x | bash - && \
    yum install -y nodejs

RUN useradd -m amplify
USER amplify
WORKDIR /home/amplify/app

COPY --chown=amplify . .

RUN npm ci
RUN npm run build

CMD ["echo", "✅ Amplify Build Simulation Success"]
