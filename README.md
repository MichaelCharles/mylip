# MyLIp (My Local IP)

MyLIp is a simple command line tool for getting your IPv4 address on your local network.

## Usage

Install globally.

```
npm i -g mylip
```

After installing, simply run `mylip` from the command line and you'll see your local IPv4 address printed in the terminal.

## Flags

* `mylip -m` Return multiple matching IP addresses (if found).
* `mylip -r` Returns the IP address without the trailing new line character. Great for piping the address via the command line. For example, on Mac to copy the IP address to the clipboard, you can run `mylip -r | pbcopy`.

## Release notes

* 0.2.1 (2020-07-22) - Introduced flags.

* 0.2.0 (2020-07-22) - I was getting inconsistent results with the tool, and so I look into a different way of grabbing the local IP address. I came across this [Stack Overflow](https://stackoverflow.com/a/3742915/5348509) post and mostly copied it verbatim. It should now work more consistently across platforms and return the correct local IP address.