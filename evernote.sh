geeknote find --tags "blog" > notes.txt

FILE=notes.txt

while read R; do
  NOTE="$(echo "$R" | egrep "[[:xdigit:]]{2,2} (\w)*, [[:xdigit:]]{4}"  | cut -d':' -f 4-)"
  if [ ! -z "$NOTE" -a "$NOTE" != " " ]; then
		echo "Current Line: " "$R"	 	
  		NAME="$(echo "$NOTE" | tr -d ' ')"
        echo "Generating... " "$NOTE" " to " "$NAME"".md"
        geeknote "jekyll" "$NOTE" > _posts/"2015-01-01-""$NAME"".md"
  fi
done < "$FILE" 
