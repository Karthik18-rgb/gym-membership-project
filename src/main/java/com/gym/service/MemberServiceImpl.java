package com.gym.service;

import com.gym.entity.Member;
import com.gym.exception.ResourceNotFoundException;
import com.gym.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public Member addMember(Member member) {
        return memberRepository.save(member);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Member getMemberById(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + id));
    }

    @Override
    @Transactional
    public Member updateMember(Long id, Member member) {
        Member existingMember = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Member not found with id: " + id));

        existingMember.setName(member.getName());
        existingMember.setPhoneNumber(member.getPhoneNumber());
        existingMember.setEmail(member.getEmail());
        existingMember.setAddress(member.getAddress());
        existingMember.setMembershipPlan(member.getMembershipPlan());
        existingMember.setJoinDate(member.getJoinDate());
        existingMember.setExpiryDate(member.getExpiryDate());

        return memberRepository.save(existingMember);
    }

    @Override
    @Transactional
    public void deleteMember(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new ResourceNotFoundException("Member not found with id: " + id);
        }
        memberRepository.deleteById(id);
    }
}
