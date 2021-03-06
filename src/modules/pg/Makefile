C = gcc
CC = g++
LIBS=/usr/local/lib/stealify
MODULE=pg

.PHONY: help clean

help:
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_\.-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

deps: ## dependencies
	mkdir -p deps
	curl -o deps/postgresql-12.3.tar.gz https://ftp.postgresql.org/pub/source/v12.3/postgresql-12.3.tar.gz
	tar -zxvf deps/postgresql-12.3.tar.gz -C deps/
	cd deps/postgresql-12.3 && CFLAGS="-fPIC" ./configure --without-readline --without-zlib

deps/postgresql-12.3/src/interfaces/libpq/libpq.a: deps
	cd deps/postgresql-12.3 && make -C src/bin
	cd deps/postgresql-12.3 && make -C src/include
	cd deps/postgresql-12.3 && make -C src/interfaces

library: deps/postgresql-12.3/src/interfaces/libpq/libpq.a ## build shared library
	$(CC) -c -fPIC -std=c++17 -DV8_COMPRESS_POINTERS -Ideps/postgresql-12.3/src/include -Ideps/postgresql-12.3/src -Ideps/postgresql-12.3/src/interfaces/libpq -I$(STEALIFY_HOME) -I$(STEALIFY_HOME)/deps/v8/include -O3 -march=native -mtune=native -Wall -Wextra -flto -Wno-unused-parameter ${MODULE}.cc
	$(CC) -s -shared -flto -pthread -m64 -Wl,--start-group ${MODULE}.o deps/postgresql-12.3/src/interfaces/libpq/libpq.a deps/postgresql-12.3/src/port/libpgport_shlib.a deps/postgresql-12.3/src/common/libpgcommon_shlib.a -Wl,--end-group -Wl,-soname=${MODULE}.so -o ${MODULE}.so

library-debug: deps/postgresql-12.3/src/interfaces/libpq/libpq.a ## build shared library
	$(CC) -c -fPIC -std=c++17 -DV8_COMPRESS_POINTERS -Ideps/postgresql-12.3/src/include -Ideps/postgresql-12.3/src -Ideps/postgresql-12.3/src/interfaces/libpq -I$(STEALIFY_HOME) -I$(STEALIFY_HOME)/deps/v8/include -O3 -march=native -mtune=native -Wall -Wextra -flto -Wno-unused-parameter ${MODULE}.cc
	$(CC) -g -shared -flto -pthread -m64 -Wl,--start-group ${MODULE}.o deps/postgresql-12.3/src/interfaces/libpq/libpq.a deps/postgresql-12.3/src/port/libpgport_shlib.a deps/postgresql-12.3/src/common/libpgcommon_shlib.a -Wl,--end-group -Wl,-soname=${MODULE}.so -o ${MODULE}.so

clean: ## tidy up
	rm -f *.o
	rm -f *.so

all: ## make all
	make clean
	make deps
	make library

install: ## copy shared library to $INSTALL
	mkdir -p ${LIBS} && cp -f ${MODULE}.so ${LIBS}

cleanall: ## tidy up dependencies
	make clean
	rm -fr deps

.DEFAULT_GOAL := help
