---
layout: post
title: Understanding IPv6
date: 21 Aug, 2015
update: 21 Aug, 2015
excerpt: IPv6 provides some rules to shorten the address.
tags: [ net(2), blog ] 
link: http://www.tutorialspoint.com/ipv6/ipv6_special_addresses.htm 
evernote: https://www.evernote.com/shard/s11/sh/404881d8-7614-4206-9691-b3bca72e364c/3aef36f00b1c6060fda05204bd3f21ee 
---
<en-note>
<ul>
<li><span style="font-size: 16px;">No </span><span style="font-size: 16px;">Broadcast, only multicast i.e a special multicast address. All host interested in multicast packet join multicast group first. <span style="font-size: 16px;">IPv6 supports any-cast i.e multiple host having same </span><span style="font-size: 16px;">address</span><span style="font-size: 16px;">. Router forwards the packet to nearest any cast server. </span></span></li>
<li><span style="font-size: 16px;">No NAT, multiple IP addresses per interface. Every inf. has link-local and a global scope address for internet/external net. Global unicast address is generated using Interface Identifier ( Mac address ).</span></li>
<li><span style="font-size: 16px;">Equivalent of loop back address (127.0.0.1) is ::1/128</span></li>
<li><span style="color: rgb(0, 0, 0); font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: justify; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; float: none; background-color: rgb(255, 255, 255);">An IPv6 address is made of 128 bits divided into eight 16-bits blocks. Each block is then converted into 4-digit Hexadecimal numbers separated by colon symbols.</span></li>
</ul>
<div><span style="font-size: 16px;"><br/></span></div>
<div>IPv6 provides some rules to shorten the address.</div>
<div><br/></div>
<div>
<blockquote style="box-sizing: border-box; font-size: 14px; border-left-width: 5px; border-left-style: solid; border-left-color: rgb(233, 233, 233); color: rgb(0, 0, 0); padding: 15px 15px 7px; font-family: 'Open Sans', Arial, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(249, 249, 249);">2001:0000:3238:DFE1:0063:0000:0000:FEFB</blockquote>
</div>
<div><br/></div>
<div style="box-sizing: border-box; word-wrap: break-word; padding: 0px; text-align: justify; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
<div><span style="font-family: 'Open Sans', Arial, sans-serif;"><b style="box-sizing: border-box;">Rule.1:</b> Discard leading Zero(es):  In Block 5, 0063, the leading two 0s can be omitted.</span></div>
<div><span style="font-family: 'Open Sans', Arial, sans-serif;"><br/></span></div>
</div>
<div>
<blockquote style="box-sizing: border-box; font-size: 14px; border-left-width: 5px; border-left-style: solid; border-left-color: rgb(233, 233, 233); color: rgb(0, 0, 0); padding: 15px 15px 7px; font-family: 'Open Sans', Arial, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(249, 249, 249);">2001:0000:3238:DFE1:63:0000:0000:FEFB</blockquote>
</div>
<div><br/></div>
<div style="box-sizing: border-box; color: rgb(0, 0, 0); word-wrap: break-word; padding: 0px; text-align: justify; font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
<div><b style="box-sizing: border-box;">Rule.2:</b> If two of more blocks contain consecutive zeroes like block 6 &amp; 7, omit them all and replace with double colon sign ::</div>
<div><br/></div>
</div>
<div>
<blockquote style="box-sizing: border-box; font-size: 14px; border-left-width: 5px; border-left-style: solid; border-left-color: rgb(233, 233, 233); color: rgb(0, 0, 0); padding: 15px 15px 7px; font-family: 'Open Sans', Arial, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(249, 249, 249);">2001:0000:3238:DFE1:63::FEFB</blockquote>
</div>
<div><br/></div>
<div style="box-sizing: border-box; color: rgb(0, 0, 0); word-wrap: break-word; padding: 0px; text-align: justify; font-family: 'Open Sans', Arial, sans-serif; font-size: 14px; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px;">
<div>          If there are still blocks of zeroes in the address like block 2, they can be shrunk down to a single zero.</div>
<div><br/></div>
</div>
<div>
<blockquote style="box-sizing: border-box; font-size: 14px; border-left-width: 5px; border-left-style: solid; border-left-color: rgb(233, 233, 233); color: rgb(0, 0, 0); padding: 15px 15px 7px; font-family: 'Open Sans', Arial, sans-serif; font-style: normal; font-variant: normal; font-weight: normal; letter-spacing: normal; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 1; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(249, 249, 249);">2001:0:3238:DFE1:63::FEFB</blockquote>
</div>
<div><span style="font-size: 16px;"><br/></span></div>
<div><span style="font-size: 16px;">Bonus points if they can show you they've been through the Hurricane Electric schpiel.</span></div>
<div><span style="font-family: 'Open Sans', Arial, sans-serif;"><br/></span></div>
<div>Resources -</div>
<div><br/></div>
<div><a href="http://www.tutorialspoint.com/ipv6/">http://www.tutorialspoint.com/ipv6/</a></div>
</en-note>