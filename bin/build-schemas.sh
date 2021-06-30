build_schema() {
  mkdir -p src/$1/types
  node -r "esbuild-runner/register" -e "console.log(JSON.stringify(require(\"./src/$1/schema\").$2))" | jtd-codegen --root-name $3 --typescript-out src/$1/types --log-format json -
}

build_schema "schema/login_opts" "loginOptsSchema" "loginOpts"
build_schema "schema/login_result" "loginResultSchema" "loginResult"
build_schema "schema/person" "personSchema" "person"
